import type {
  IApp,
  IAppService,
  ICreateAppData,
  IPageBuilderAppProps,
  IUpdateAppData,
} from '@codelab/frontend/abstract/core'
import {
  getComponentService,
  getElementService,
  IAppDTO,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getDomainService } from '@codelab/frontend/domain/domain'
import { getPageService, pageApi, pageRef } from '@codelab/frontend/domain/page'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getResourceService } from '@codelab/frontend/domain/resource'
import {
  getActionService,
  getStoreService,
} from '@codelab/frontend/domain/store'
import { getTagService } from '@codelab/frontend/domain/tag'
import { getTypeService } from '@codelab/frontend/domain/type'
import { VercelService } from '@codelab/frontend/domain/vercel'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  AppWhere,
  GetRenderedPageAndCommonAppDataQuery,
} from '@codelab/shared/abstract/codegen'
import flatMap from 'lodash/flatMap'
import merge from 'lodash/merge'
import sortBy from 'lodash/sortBy'
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
    vercelService: prop(() => new VercelService({})),
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
  private get domainService() {
    return getDomainService(this)
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

    components.forEach((componentData) => {
      this.propService.add(componentData.props)
    })

    // Sorting the components here so that they will be sorted when referenced in the
    // explorer builder tree, or in other areas
    // Would be nice if this can be sorted in the backend instead
    const allElements = [
      ...flatMap(sortBy(components, 'name'), ({ rootElement }) => rootElement),
      ...flatMap(
        components,
        ({ rootElement }) => rootElement.descendantElements,
      ),
      ...flatMap(appData.pages, ({ rootElement }) => [
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

      if (elementData.renderComponentType || elementData.parentComponent) {
        const component = (elementData.renderComponentType ??
          elementData.parentComponent)!

        this.typeService.addInterface(component.api)

        this.componentService.add(component)
      }

      this.elementService.add(elementData)
    })

    appData.pages.forEach((pageData) => {
      this.storeService.add(pageData.store)
      this.pageService.add(pageData)
    })

    const page = app.page(pageId)

    return {
      app,
      page,
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
  add({ domains, id, name, owner, pages }: IAppDTO) {
    domains?.forEach((domain) => this.domainService.add(domain))

    const app = App.create({
      domains,
      id,
      name,
      owner,
      pages: pages?.map((page) => pageRef(page.id)),
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
    const pages = this.pageService.pageFactory.addSystemPages({ id, owner })

    const app = this.add({
      id,
      name,
      owner,
      pages,
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

    this.typeService.loadTypes(types)

    // write cache for resources
    this.resourceService.load(resources)

    const stores = [...appData.pages, ...components].map(
      (pageOrComponent) => pageOrComponent.store,
    )

    this.storeService.load(stores)

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

    for (const domain of app.domains) {
      yield* _await(this.vercelService.delete(domain.current.name))
    }

    return app
  })
}
