import type {
  IAppModel,
  IAppService,
  ICreateAppData,
  IPageBuilderAppProps,
  IUpdateAppData,
} from '@codelab/frontend/abstract/core'
import {
  getComponentService,
  getElementService,
  getUserService,
  pageRef,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getDomainService } from '@codelab/frontend/domain/domain'
import { getPageService, pageApi } from '@codelab/frontend/domain/page'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getResourceService } from '@codelab/frontend/domain/resource'
import {
  getActionService,
  getStoreService,
} from '@codelab/frontend/domain/store'
import { getTagService } from '@codelab/frontend/domain/tag'
import { getFieldService, getTypeService } from '@codelab/frontend/domain/type'
import { VercelService } from '@codelab/frontend/domain/vercel'
import {
  ModalService,
  sortPagesByKindAndName,
} from '@codelab/frontend/shared/utils'
import type {
  AppWhere,
  BuilderPageFragment,
  GetProductionPageQuery,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IDomainDTO } from '@codelab/shared/abstract/core'
import { IAppDTO, IElementRenderTypeKind } from '@codelab/shared/abstract/core'
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
import { AppRepository } from '../services/app.repo'
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    appRepository: prop(() => new AppRepository({})),
    apps: prop(() => objectMap<IAppModel>()),
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
  private get domainService() {
    return getDomainService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get actionService() {
    return getActionService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
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
  private get fieldService() {
    return getFieldService(this)
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
  loadPages = ({ pages }: IPageBuilderAppProps) => {
    sortPagesByKindAndName(pages)

    const allElements = flatMap(pages, (page) => {
      const { id, rootElement } = page

      this.pageService.add(page)

      const elements = [rootElement, ...rootElement.descendantElements]

      elements.forEach((elementData) => {
        this.propService.add(elementData.props)

        /**
         * Element comes with `component` or `atom` data that we need to load as well
         *
         * TODO: Need to handle component case
         */
        if (elementData.renderType.__typename === IElementRenderTypeKind.Atom) {
          this.typeService.loadTypes({
            interfaceTypes: [elementData.renderType.api],
          })

          elementData.renderType.tags.forEach((tag) => this.tagService.add(tag))

          this.atomService.add(elementData.renderType)
        }

        this.elementService.add({
          ...elementData,
          closestContainerNode: { id },
        })
      })
    })

    return allElements
  }

  /**
   * This is used for the apps list preview
   *
   * 1) We require the first page to create a URL
   */
  @modelFlow
  loadAppsPreview = _async(function* (this: AppService, where: AppWhere) {
    const { apps: appsData } = yield* _await(this.appRepository.appsList(where))

    const apps = appsData.map((appData) => {
      /**
       * Pages
       */
      appData.pages.forEach((page) => {
        this.pageService.add(page)
      })
      // this.loadPages(appData)

      // /**
      //  * Domains
      //  */
      // appData.domains.forEach((domain) => {
      //   this.domainService.add(domain)
      // })

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
    const { items: apps } = yield* _await(this.appRepository.find(where))

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
    domains?.forEach((domain) => this.domainService.add(domain as IDomainDTO))

    let app = this.apps.get(id)

    if (app) {
      app.writeCache({
        domains,
        name,
        pages,
      })
    } else {
      app = App.create({
        domains,
        id,
        name,
        owner,
        pages,
      })
    }

    this.apps.set(app.id, app)

    return app
  }

  @modelFlow
  @transaction
  create = _async(function* (this: AppService, { id, name }: ICreateAppData) {
    const pages = this.pageService.pageFactory.addSystemPages({
      id,
      name,
    })

    const app = this.add({
      id,
      name,
      owner: this.userService.user,
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
  loadDevelopmentPage = _async(function* (
    this: AppService,
    appCompositeKey: string,
    pageCompositeKey: string,
  ) {
    const fetchedData = yield* _await(
      pageApi.GetDevelopmentPage({ appCompositeKey, pageCompositeKey }),
    )

    const {
      apps: [appData],
      resources,
    } = fetchedData

    if (!appData) {
      return undefined
    }

    /**
     * Load app, pages, elements
     */
    this.loadPages({ pages: appData.pages as Array<BuilderPageFragment> })

    // write cache for resources
    this.resourceService.load(resources)

    return this.add(appData)
  })

  /**
   * This is the 'production' version of `loadBuilderPage`. Already has initial data, just needs to hydrate the models
   */
  @modelFlow
  loadProductionPage = (initialData: GetProductionPageQuery) => {
    const {
      apps: [appData],
      resources,
    } = initialData

    if (!appData) {
      return undefined
    }

    this.loadPages({ pages: appData.pages as Array<BuilderPageFragment> })

    this.resourceService.load(resources)

    return this.add(appData)
  }

  @modelFlow
  @transaction
  getAppPages = _async(function* (
    this: AppService,
    appId: string,
    where: PageWhere,
  ) {
    const { items: pages } = yield* _await(
      this.pageService.pageRepository.find({
        AND: [{ appConnection: { node: { id: appId } } }, where],
      }),
    )

    this.loadPages({ pages })

    const app = this.app(appId)
    pages.forEach(({ id }) => {
      const pageExistsInApp = app?.pages.find(
        (appPage) => appPage.current.id === id,
      )

      if (!pageExistsInApp) {
        app?.pages.push(pageRef(id))
      }
    })
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, app: IAppModel) {
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
    const pageStores = pages.map((page) => page.store.current)
    const storeApis = pageStores.flatMap((store) => store.api?.current ?? [])
    const fields = storeApis.flatMap((api) => api.fields)
    const fieldApis = fields.flatMap((field) => field.api.current)
    const allTypes = [...storeApis, ...fieldApis]

    yield* _await(this.elementService.elementRepository.delete(pageElements))
    yield* _await(this.appRepository.delete([app]))
    yield* _await(this.storeService.storeRepository.delete(pageStores))
    yield* _await(this.typeService.typeRepository.delete(allTypes))
    yield* _await(this.fieldService.fieldRepository.delete(fields))

    for (const domain of app.domains) {
      yield* _await(this.vercelService.delete(domain.current.name))
    }

    return app
  })
}
