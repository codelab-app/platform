import {
  getComponentService,
  getElementService,
  getResourceService,
  getUserService,
  type IAppService,
} from '@codelab/frontend/abstract/application'
import type {
  IAppModel,
  ICreateAppData,
  IUpdateAppData,
  IUpdatePageData,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/application/atom'
import { getDomainService } from '@codelab/frontend/application/domain'
import {
  getPageService,
  PageRepository,
} from '@codelab/frontend/application/page'
import { getStoreService } from '@codelab/frontend/application/store'
import { AppDomainService } from '@codelab/frontend/domain/app'
import { Page } from '@codelab/frontend/domain/page'
import { ModalService } from '@codelab/frontend/domain/shared'
import { VercelService } from '@codelab/frontend/domain/vercel'
import type { AppWhere, PageWhere } from '@codelab/shared/abstract/codegen'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { AppProductionService } from '../use-cases'
import { AppDevelopmentService } from '../use-cases/app-development'
import { AppRepository } from './app.repo'
import { AppModalService } from './app-modal.service'

@model('@codelab/AppService')
export class AppService
  extends Model({
    appDevelopmentService: prop(() => new AppDevelopmentService({})),
    appDomainService: prop(() => new AppDomainService({})),
    appProductionService: prop(() => new AppProductionService({})),
    appRepository: prop(() => new AppRepository({})),
    buildModal: prop(() => new AppModalService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new AppModalService({})),
    pageRepository: prop(() => new PageRepository({})),
    updateModal: prop(() => new AppModalService({})),
    vercelService: prop(() => new VercelService({})),
  })
  implements IAppService
{
  @modelFlow
  @transaction
  create = _async(function* (this: AppService, { id, name }: ICreateAppData) {
    const app = this.appDomainService.create({
      id,
      name,
      owner: this.userService.user,
      pages: [],
    })

    yield* _await(this.appRepository.add(app))

    return app
  })

  @modelFlow
  updatePage = _async(function* (this: AppService, data: IUpdatePageData) {
    const app = this.appDomainService.apps.get(data.app.id)
    const page = app?.page(data.id)
    const { name, pageContentContainer, url } = data

    page?.writeCache({
      app,
      name,
      pageContentContainer,
      url,
    })

    if (page) {
      yield* _await(this.pageRepository.update(page))
    }

    return
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, apps: Array<IAppModel>) {
    const deleteApp = _async(function* (this: AppService, app: IAppModel) {
      /**
       * Optimistic update
       */
      this.appDomainService.apps.delete(app.id)

      /**
       * Get all pages to delete
       */
      const { items: pages } = yield* _await(
        this.pageRepository.find({
          appConnection: { node: { id: app.id } },
        }),
      )

      // Need to load elements as well
      const elements = pages.flatMap((page) => page.rootElement)

      yield* _await(this.elementService.elementRepository.delete(elements))
      yield* _await(this.appRepository.delete([app]))

      for (const domain of app.domains) {
        yield* _await(this.vercelService.delete(domain.name))
      }

      return app
    })

    yield* _await(Promise.all(apps.map((app) => deleteApp(app))))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where: AppWhere) {
    const { items: apps } = yield* _await(this.appRepository.find(where))

    return apps.map((app) => this.appDomainService.hydrate(app))
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

    const app = this.appDomainService.app(appId)

    pages.forEach((page) => {
      const pageExistsInApp = app?.pages.find(
        (appPage) => appPage.id === page.id,
      )

      if (!pageExistsInApp) {
        app?.pages.push(Page.create(page))
      }
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AppService, id: string) {
    const [app] = yield* _await(this.getAll({ id }))

    return app
  })

  @modelFlow
  getSelectAppOptions = _async(function* (this: AppService) {
    yield* _await(this.getAll({}))

    return this.appDomainService.appsList.map((app) => ({
      label: app.name,
      value: app.id,
    }))
  })

  /**
   * This is used for the apps list preview
   *
   * 1) We require the first page to create a URL
   */
  @modelFlow
  loadAppsPreview = _async(function* (this: AppService, where: AppWhere) {
    const { apps, atoms } = yield* _await(this.appRepository.appsList(where))

    atoms.forEach((atom) => this.atomService.atomDomainService.add(atom))

    return apps.map((app) => this.appDomainService.hydrate(app))
  })

  @modelFlow
  @transaction
  update = _async(function* (this: AppService, { id, name }: IUpdateAppData) {
    const app = this.appDomainService.apps.get(id)!

    app.writeCache({ name })

    yield* _await(this.appRepository.update(app))

    return app
  })

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
