import {
  getElementService,
  type IAppService,
} from '@codelab/frontend/abstract/application'
import {
  getUserDomainService,
  type IAppModel,
  type ICreateAppData,
  type IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend-application-atom/services'
import {
  getDomainService,
  regeneratePages,
} from '@codelab/frontend-application-domain/services'
import {
  getPageService,
  PageRepository,
} from '@codelab/frontend-application-page/services'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { AppDomainService } from '@codelab/frontend-domain-app/services'
import { restWebClient } from '@codelab/frontend-infra-axios'
import type { App, AppWhere } from '@codelab/shared/abstract/codegen'
import type {
  IAppAggregate,
  IUpdatePageData,
} from '@codelab/shared/abstract/core'
import { assertIsDefined, prettifyForConsole } from '@codelab/shared/utils'
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
import { AppDevelopmentService } from '../use-cases/app-development'
import { AppProductionService } from '../use-cases/app-production'
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
  })
  implements IAppService
{
  @modelFlow
  @transaction
  create = _async(function* (this: AppService, { id, name }: ICreateAppData) {
    const app = this.appDomainService.create({
      id,
      name,
      owner: this.userDomainService.user,
      pages: [],
    })

    yield* _await(this.appRepository.add(app))

    return app
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: AppService, apps: Array<IAppModel>) {
    const deleteApp = async (app: IAppModel) => {
      /**
       * Optimistic update.
       * Detach pages before detaching app from root store to avoid script error.
       */
      app.pages.forEach((page) => {
        this.pageService.pageDomainService.pages.delete(page.id)
      })
      this.appDomainService.apps.delete(app.id)

      /**
       * Get all pages to delete
       */
      const { items: pages } = await this.pageRepository.find({
        appConnection: { node: { id: app.id } },
      })

      // Need to load elements as well
      const elements = pages.flatMap((page) => page.rootElement)

      await this.elementService.elementRepository.delete(elements)
      await this.appRepository.delete([app])

      return app
    }

    yield* _await(Promise.all(apps.map((app) => deleteApp(app))))
  })

  @modelFlow
  exportApp = _async(function* (this: AppService, app: IAppModel) {
    const res = yield* _await(
      restWebClient.get<IAppAggregate>(`app/export?id=${app.id}`),
    )

    const filename = `${app.slug}.json`
    const contentType = 'application/json;charset=utf-8;'
    const a = document.createElement('a')

    a.download = filename
    a.href = `data:${contentType},${encodeURIComponent(
      prettifyForConsole(res.data),
    )}`
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    return res
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: AppService, where: AppWhere) {
    const { items: apps } = yield* _await(this.appRepository.find(where))

    return apps.map((app) => this.appDomainService.hydrate(app))
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

  @modelFlow
  importApp = _async(function* (this: AppService, appDataFile: File) {
    const formData = new FormData()

    formData.append('file', appDataFile)

    return yield* _await(
      restWebClient
        .post<App>('/app/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          return this.loadAppsPreview({ id: data.id })
        }),
    )
  })

  @modelFlow
  @transaction
  update = _async(function* (this: AppService, { id, name }: IUpdateAppData) {
    const app = this.appDomainService.apps.get(id)

    assertIsDefined(app)

    app.writeCache({ name })

    yield* _await(this.appRepository.update(app))

    return app
  })

  @modelFlow
  updatePage = _async(function* (this: AppService, data: IUpdatePageData) {
    const app = this.appDomainService.apps.get(data.app.id)
    const page = app?.page(data.id)
    const { name, pageContentContainer, urlPattern } = data

    page?.writeCache({
      app,
      name,
      pageContentContainer,
      urlPattern,
    })

    if (page) {
      yield* _await(this.pageRepository.update(page))
    }

    return
  })

  regeneratePages = async (app: IAppModel, pagesUrls?: Array<string>) => {
    let domains = this.domainService.domainsList.filter(
      (_domain) => _domain.app.id === app.id,
    )

    if (!domains.length) {
      domains = await this.domainService.getAll({ app: { id: app.id } })
    }

    for (const domain of domains) {
      const pages = pagesUrls ?? app.pages.map((page) => page.urlPattern)

      await regeneratePages(pages, domain.name)
    }
  }

  @computed
  private get atomService() {
    return getAtomService(this)
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
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
