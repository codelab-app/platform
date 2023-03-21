import type {
  IApp,
  IAppService,
  ICreateAppData,
  IInterfaceType,
  IPageBuilderAppProps,
  IUpdateAppData,
} from '@codelab/frontend/abstract/core'
import {
  getComponentService,
  getElementService,
  IAppDTO,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPageService, pageApi, pageRef } from '@codelab/frontend/domain/page'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getResourceService } from '@codelab/frontend/domain/resource'
import {
  getActionService,
  getStoreService,
  Store,
  storeRef,
} from '@codelab/frontend/domain/store'
import { getTagService } from '@codelab/frontend/domain/tag'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  AppWhere,
  GetRenderedPageAndCommonAppDataQuery,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import flatMap from 'lodash/flatMap'
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
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    appRepository: prop(() => new AppRepository({})),
    apps: prop(() => objectMap<IApp>()),
    buildModal: prop(() => new AppModalService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new AppModalService({})),
    updateModal: prop(() => new AppModalService({})),
  })
  implements IAppService
{
  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get resourceService() {
    return getResourceService(this)
  }

  @computed
  private get actionService() {
    return getActionService(this)
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
  private get tagService() {
    return getTagService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
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
   * - Hydrate element
   */
  @modelAction
  loadPages = ({ appData, components, pageId }: IPageBuilderAppProps) => {
    const app = this.add(appData)

    const allElements = [
      ...flatMap(appData.pages, ({ rootElement }) => [
        rootElement,
        ...rootElement.descendantElements,
      ]),
      ...flatMap(components, ({ rootElement }) => [
        rootElement,
        ...rootElement.descendantElements,
      ]),
    ]

    allElements.forEach((elementData) => {
      this.propService.add(elementData.props)

      /**
       * Element comes with `component` or `atom` data that we need to load as well
       */
      if (elementData.renderAtomType?.id) {
        this.typeService.addInterface(elementData.renderAtomType.api)

        elementData.renderAtomType.tags.forEach((tag) =>
          this.tagService.add(tag),
        )

        this.atomService.add(elementData.renderAtomType)
      }

      if (elementData.renderComponentType?.id) {
        this.typeService.addInterface(elementData.renderComponentType.api)

        this.componentService.add(elementData.renderComponentType)
      }

      this.elementService.add(elementData)
    })

    appData.pages.forEach((pageData) => {
      this.pageService.add({
        ...pageData,
        descendentElements: pageData.rootElement.descendantElements,
      })
    })

    const page = app.page(pageId)
    const rootElement = this.elementService.element(page.rootElement.id)
    const pageElementTree = page.initTree(rootElement, page.elements)

    return {
      app,
      page,
      pageElementTree,
    }
  }

  /**
   * For nested properties, only show the preview
   */
  @modelFlow
  loadAppsWithNestedPreviews = _async(function* (
    this: AppService,
    where: AppWhere,
  ) {
    const appsData = yield* _await(this.appRepository.find(where))

    const apps = appsData.map((appData) => {
      appData.pages.forEach((pageData) => {
        this.elementService.add(pageData.rootElement)
        this.pageService.add(pageData)
      })

      return this.add(appData)
    })

    return apps
  })

  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where: AppWhere) {
    const apps = yield* _await(this.appRepository.find(where))

    return apps.map((app) => this.add(app))
  })

  @modelFlow
  @transaction
  update = _async(function* (this: AppService, { id, name }: IUpdateAppData) {
    const app = this.apps.get(id)!

    app.writeCache({ name })

    yield* _await(this.appRepository.update(app))

    return app
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AppService, id: string) {
    const [app] = yield* _await(this.getAll({ id }))

    return app
  })

  @modelAction
  add({ id, name, owner, pages, store }: IAppDTO) {
    const app = App.create({
      id,
      name,
      owner,
      pages: pages?.map((page) => pageRef(page.id)),
      store: storeRef(store.id),
    })

    this.apps.set(app.id, app)

    return app
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: AppService,
    { id, name, owner }: ICreateAppData,
  ) {
    const interfaceType = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
      owner: owner,
    })

    const store = this.storeService.add({
      api: typeRef<IInterfaceType>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const pages = this.pageService.pageFactory.addSystemPages({ id, owner })

    const app = this.add({
      id,
      name,
      owner,
      pages,
      store,
    })

    yield* _await(this.appRepository.add(app))

    return app
  })

  /**
    This function fetches the initial page and all the common data shared across all pages in the application:
     - app data
     - current page
     - providers page (_app)
     - components
     - resources
     - types
   */
  @modelFlow
  @transaction
  getRenderedPageAndCommonAppData = _async(function* (
    this: AppService,
    appId: string,
    pageId: string,
    // Production is pre-built with all required data, no need for network request
    initialData?: GetRenderedPageAndCommonAppDataQuery,
  ) {
    const {
      apps: [appData],
      components,
      resources,
      ...types
    } = initialData
      ? initialData
      : yield* _await(
          pageApi.GetRenderedPageAndCommonAppData({ appId, pageId }),
        )

    if (!appData) {
      return undefined
    }

    /**
     * Load app, pages, elements
     */
    const { app } = this.loadPages({ appData, components, pageId })

    // load types by chucks so UI is not blocked
    this.typeService.loadTypesByChunks(types)

    // load components trees
    this.componentService.loadRenderedComponentsTree(components)

    // write cache for resources
    this.resourceService.load(resources)

    const actionsDTO = appData.store.actions.map((action) =>
      this.actionService.actionFactory.fromActionFragment(action),
    )

    const actions = this.actionService.load(actionsDTO)
    const storeApi = this.typeService.addInterface(appData.store.api)

    // hydrate store after types and resources
    const appStore = this.storeService.add({
      actions,
      api: storeApi,
      id: appData.store.id,
      name: appData.store.name,
    })

    appStore.state.setMany(app.toJson)

    return app
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, app: IApp) {
    /**
     * Optimistic update
     */
    this.apps.delete(app.id)

    /**
     * Get all pages to delete
     */
    const pages = yield* _await(
      this.pageService.getAll({
        appConnection: { node: { id: app.id } },
      }),
    )

    /**
     * Get all elements of page to delete
     */
    const pageElements = pages.flatMap((page) => page.elements)

    yield* _await(this.elementService.elementRepository.delete(pageElements))

    yield* _await(this.appRepository.delete([app]))

    return app
  })
}
