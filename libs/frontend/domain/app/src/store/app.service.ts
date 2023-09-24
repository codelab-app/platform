import type {
  IAppDevelopmentDto,
  IAppModel,
  IAppService,
  ICreateAppData,
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
import { getPageService } from '@codelab/frontend/domain/page'
import { getResourceService } from '@codelab/frontend/domain/resource'
import { ModalService } from '@codelab/frontend/domain/shared'
import { getStoreService } from '@codelab/frontend/domain/store'
import { VercelService } from '@codelab/frontend/domain/vercel'
import { sortPagesByKindAndName } from '@codelab/frontend/shared/utils'
import type {
  AppWhere,
  GetProductionPageQuery,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO, IDomainDTO } from '@codelab/shared/abstract/core'
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
import { AppDevelopmentService } from '../use-cases'
import { App } from './app.model'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    appDevelopmentService: prop(() => new AppDevelopmentService({})),
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
  get appsJson() {
    return this.appsList.map((app) => app.toJson).reduce(merge, {})
  }

  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (this: AppService, { id, name }: ICreateAppData) {
    const atomReactFragment = yield* _await(
      this.atomService.getDefaultElementRenderType(),
    )

    const pages = this.pageService.pageFactory.addSystemPages(
      {
        id,
        name,
      },
      atomReactFragment,
    )

    const app = this.add({
      id,
      name,
      owner: this.userService.user,
      pages,
    })

    yield* _await(this.appRepository.add(app))

    return app
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, apps: Array<IAppModel>) {
    const deleteApp = async (app: IAppModel) => {
      /**
       * Optimistic update
       */
      this.apps.delete(app.id)

      /**
       * Get all pages to delete
       */
      const pages = await this.pageService.getAll({
        appConnection: { node: { id: app.id } },
      })

      // Need to load elements as well
      const elements = pages.flatMap((page) => page.elements)

      await this.elementService.elementRepository.delete(elements)
      await this.appRepository.delete([app])

      for (const domain of app.domains) {
        await this.vercelService.delete(domain.current.name)
      }

      return app
    }

    yield* _await(Promise.all(apps.map((app) => deleteApp(app))))

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where: AppWhere) {
    const { items: apps } = yield* _await(this.appRepository.find(where))

    return apps.map((app) => this.add(app))
  })

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

    // this.loadPages({ pages })

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
  getOne = _async(function* (this: AppService, id: string) {
    const [app] = yield* _await(this.getAll({ id }))

    return app
  })

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

  /**
   This function fetches the initial page and all the common data shared across all pages in the application:
   - app data
   - current page
   - providers page (_app)
   - components
   - resources
   - types
   */
  // @modelFlow
  // loadDevelopmentPage = _async(function* (
  //   this: AppService,
  //   appName: string,
  //   pageName: string,
  // ) {
  //   console.debug('AppService.loadDevelopmentPage()')

  //   const user = this.userService.user
  //   const appCompositeKey = AppProperties.appCompositeKey(appName, user)

  //   /**
  //    * Fetch app first, since app could be not loaded
  //    */
  //   const app = yield* _await(
  //     this.loadAppsPreview({
  //       compositeKey: AppProperties.appCompositeKey(appName, user),
  //     }),
  //   )

  //   console.debug('loaded app', app)

  //   const pageCompositeKey = PageProperties.pageCompositeKey(pageName, app)

  //   const pageData = yield* _await(
  //     pageApi.GetDevelopmentPage({ appCompositeKey, pageCompositeKey }),
  //   )

  //   console.debug('pageApi.GetDevelopmentPage()', pageData)

  //   const {
  //     apps: [appData],
  //     resources,
  //   } = pageData

  //   if (!appData) {
  //     return null
  //   }

  //   /**
  //    * Load app, pages, elements
  //    */
  //   this.loadPages({ pages: appData.pages as Array<BuilderPageFragment> })

  //   // write cache for resources
  //   this.resourceService.load(resources)

  //   return this.add(appData)
  // })

  @modelFlow
  @transaction
  update = _async(function* (this: AppService, { id, name }: IUpdateAppData) {
    const app = this.apps.get(id)!

    app.writeCache({ name })

    yield* _await(this.appRepository.update(app))

    return app
  })

  @modelAction
  add = ({ domains, id, name, owner, pages }: IAppDTO) => {
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

  /**
   * Aggregate root method to setup all data invariants
   *
   * - Hydrate app
   * - Hydrate page
   * - Hydrate element
   */
  @modelAction
  loadPages = ({ pages }: IAppDevelopmentDto) => {
    console.debug('AppService.loadPages()', pages)
    sortPagesByKindAndName(pages)

    const allElements = pages.map((page) => {
      const { id, rootElement } = page

      const elements = [rootElement, ...rootElement.descendantElements].map(
        (element) => ({ ...element, closestContainerNode: { id: page.id } }),
      )

      this.pageService.loadElements(elements)
      this.pageService.add(page)
      this.storeService.load([page.store])
    })

    return allElements
  }

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

    // this.loadPages({ pages: appData.pages })

    this.resourceService.load(resources)

    return this.add(appData)
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get domainService() {
    return getDomainService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get pageService() {
    return getPageService(this)
  }

  @computed
  private get resourceService() {
    return getResourceService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
