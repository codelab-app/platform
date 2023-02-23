import type {
  IApp,
  IAppService,
  IPageBuilderAppProps,
  IUpdateAppDTO,
} from '@codelab/frontend/abstract/core'
import { ICreateAppDTO } from '@codelab/frontend/abstract/core'
import { getPageService, pageRef } from '@codelab/frontend/domain/page'
import {
  deleteStoreInput,
  getStoreService,
  storeRef,
} from '@codelab/frontend/domain/store'
import { getElementService } from '@codelab/frontend/presenter/container'
import { createUniqueName, ModalService } from '@codelab/frontend/shared/utils'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import {
  _async,
  _await,
  getSnapshot,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
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

  // @computed
  // private get typeService() {
  //   return getTypeService(this)
  // }

  @computed
  get appsJson() {
    return this.appsList.map((app) => app.toJson).reduce(merge, {})
  }

  /**
   * Aggregate root method to setup all data invariants
   */
  @modelAction
  load = ({ app, pageId }: IPageBuilderAppProps) => {
    console.debug('AppService.load', app, pageId)

    /**
     * Need to create nested model
     */
    const appModel = this.create(app)
    const pageModel = appModel.page(pageId)
    const page = app.pages.find((appPage) => appPage.id === pageId)

    if (!page) {
      throw new Error('Missing page')
    }

    const elements = [page.rootElement, ...page.rootElement.descendantElements]

    const pageElements = elements.map((element) =>
      this.elementService.writeCache(element),
    )

    const rootElement = this.elementService.element(page.rootElement.id)

    if (!rootElement) {
      throw new Error('No root element found')
    }

    const pageElementTree = pageModel.initTree(rootElement, pageElements)

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

    return apps.map((app) => this.create(app))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: AppService,
    entity: IEntity,
    { name }: IUpdateAppDTO,
  ) {
    const {
      updateApps: { apps },
    } = yield* _await(
      appApi.UpdateApps({
        update: { name: createUniqueName(name) },
        where: { id: entity.id },
      }),
    )

    return apps.map((app) => this.create(app))
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
  add = _async(function* (this: AppService, appDto: ICreateAppDTO) {
    const app = this.create(appDto)

    console.log(getSnapshot(app))

    yield* _await(this.appRepository.add(app))

    return app
  })

  @modelAction
  create(appDTO: ICreateAppDTO) {
    const store = this.storeService.add(appDTO)

    const app = new App({
      ...appDTO,
      pages: [
        pageRef(this.pageService.pageFactory.createProviderPage(appDTO)),
        pageRef(this.pageService.pageFactory.createNotFoundPage(appDTO)),
        pageRef(
          this.pageService.pageFactory.createInternalServerErrorPage(appDTO),
        ),
      ],
      store: storeRef(store),
    })

    this.apps.set(app.id, app)

    return app
  }

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
