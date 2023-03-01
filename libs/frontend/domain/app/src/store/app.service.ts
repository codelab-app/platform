import type {
  IAppService,
  ICreateAppData,
  IInterfaceType,
  IPageBuilderAppProps,
  IPageDTO,
  IUpdateAppData,
} from '@codelab/frontend/abstract/core'
import { IApp, IAppDTO, IStoreDTO } from '@codelab/frontend/abstract/core'
import { getPageService, pageRef } from '@codelab/frontend/domain/page'
import {
  deleteStoreInput,
  getStoreService,
  Store,
  storeRef,
} from '@codelab/frontend/domain/store'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import { getElementService } from '@codelab/frontend/presenter/container'
import { createUniqueName, ModalService } from '@codelab/frontend/shared/utils'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { AppRepository } from '../services/app.repo'
import { appApi } from './app.api'
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    apps: prop(() => objectMap<IApp>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new AppModalService({})),
    deleteModal: prop(() => new AppModalService({})),
    buildModal: prop(() => new AppModalService({})),
    appRepository: prop(() => new AppRepository({})),
  })
  implements IAppService
{
  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get pageService() {
    return getPageService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  get appsJson() {
    return this.appsList.map((app) => app.toJson).reduce(merge, {})
  }

  /**
   * Aggregate root method to setup all data invariants
   *
   * - Hydrate app
   * - Hydrate page
   */
  @modelAction
  load = ({ app, pageId }: IPageBuilderAppProps) => {
    console.debug('AppService.load', app, pageId)

    const appDTO = App.parsePageBuilderData(app)
    const appModel = this.add(appDTO)
    // const pageModel = appModel.page(pageId)
    const page = app.pages.find((appPage) => appPage.id === pageId)

    if (!page) {
      throw new Error('Missing page')
    }

    const pageModel = this.pageService.add(page)

    const elements = [
      page.rootElement,
      ...page.rootElement.descendantElements,
    ].map((element) => this.elementService.add(element))

    const rootElement = this.elementService.element(page.rootElement.id)
    const pageElementTree = pageModel.initTree(rootElement, elements)

    return {
      pageElementTree,
      app: appModel,
      page: pageModel,
    }
  }

  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where?: AppWhere) {
    const { apps } = yield* _await(appApi.GetApps({ where }))

    return apps.map((app) => this.add(app))
  })

  @modelFlow
  @transaction
  update = _async(function* (this: AppService, { id, name }: IUpdateAppData) {
    const app = this.apps.get(id)

    app?.writeCache({ name })

    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { _compoundName: createUniqueName(name, { id }) },
        where: { id },
      }),
    )

    return app!
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AppService, id: string) {
    if (this.apps.has(id)) {
      return this.apps.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  private save = _async(function* (this: AppService, app: IApp) {
    return yield* _await(this.appRepository.add(app))
  })

  @modelAction
  add({ id, name, owner, pages, store }: IAppDTO): IApp {
    const newApp = App.create({
      id,
      name,
      owner,
      pages: pages?.map((page) => pageRef(page.id)),
      store: storeRef(store.id),
    })

    this.apps.set(newApp.id, newApp)

    return newApp
  }

  @modelFlow
  create = _async(function* (
    this: AppService,
    { id, name, owner }: ICreateAppData,
  ) {
    const interfaceType = this.typeService.addInterface({
      id: v4(),
      name: InterfaceType.createName(`${name} Store`),
      kind: ITypeKind.InterfaceType,
      owner: owner,
    })

    const store = this.storeService.add({
      id: v4(),
      name: Store.createName({ name }),
      api: typeRef(interfaceType.id) as Ref<IInterfaceType>,
    })

    const pages = this.pageService.pageFactory.addSystemPages({ id })

    const app = this.add({
      id,
      name,
      owner,
      pages,
      store: storeRef(store),
    })

    yield* _await(this.save(app))

    return app
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, id: string) {
    const existingApp = this.apps.get(id)

    this.apps.delete(id)

    const pageRootElements = existingApp?.pageRootElements ?? []

    /**
     * Delete all elements from all pages
     */
    yield* _await(
      Promise.all(
        pageRootElements.map(async (root) => {
          await this.elementService.deleteElementSubgraph(root)
        }),
      ),
    )

    const {
      deleteApps: { nodesDeleted },
    } = yield* _await(
      appApi.DeleteApps({
        where: { id },
        delete: {
          pages: [
            {
              where: {},
              delete: {},
            },
          ],
          store: {
            where: {},
            delete: deleteStoreInput,
          },
        },
      }),
    )

    return existingApp!
  })
}
