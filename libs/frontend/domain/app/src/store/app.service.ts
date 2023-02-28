import type {
  IAppService,
  ICreateAppData,
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
import { getTypeService } from '@codelab/frontend/domain/type'
import { getElementService } from '@codelab/frontend/presenter/container'
import { createUniqueName, ModalService } from '@codelab/frontend/shared/utils'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import merge from 'lodash/merge'
import { computed } from 'mobx'
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
  update = _async(function* (this: AppService, { name, id }: IUpdateAppData) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { name: createUniqueName(name) },
        where: { id },
      }),
    )

    return apps.map((app) => this.add(app))
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

  /**
   * We don't hydrate pages here, because a page is its own aggregate root.
   *
   * Also we can create an app with creating user pages
   */
  // @modelAction
  // create(appDTO: IAppDTO, pageDTOs?: Array<IPageDTO>, storeDTO?: IStoreDTO) {
  //   const store = this.storeService.create(appDTO)

  //   const app = new App({
  //     ...appDTO,
  //     pages: appDTO.pages.map((page) => pageRef(page.id)),
  //     store: storeRef(store),
  //   })

  //   return app
  // }

  @modelAction
  add({ id, name, owner, pages, store }: IAppDTO): IApp {
    const newApp = new App({
      id,
      name,
      owner,
      pages: pages?.map((page) => pageRef(page.id)),
      store: storeRef(store.id),
    })

    this.apps.set(newApp.id, newApp)

    return newApp
  }

  @modelAction
  createSubmit = _async(function* (this: AppService, appData: ICreateAppData) {
    const store = Store.createFromApp(appData)
    const api = store.api.current

    this.typeService.addInterface(api)
    this.storeService.add({
      ...store,
      actions: [],
      api,
    })

    const pages = this.pageService.pageFactory
      .createSystemPages(appData)
      .map((page) => this.pageService.add(page))

    const app = App.create({
      ...appData,
      pages,
      store: storeRef(store),
    })

    yield* _await(this.save(app))

    return app
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, ids: Array<string>) {
    const pageRootElements = ids
      .map((id) => this.apps.get(id))
      .flatMap((app) => app?.pages.map((page) => page.current.rootElement.id))
      .filter((id): id is string => Boolean(id))

    ids.forEach((id) => this.apps.delete(id))

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
        where: { id_IN: ids },
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

    return nodesDeleted
  })
}
