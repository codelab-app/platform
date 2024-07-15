import {
  getElementService,
  type IAppService,
} from '@codelab/frontend/abstract/application'
import {
  getAppDomainService,
  getUserDomainService,
  type IAppModel,
  type IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { getAtomService } from '@codelab/frontend-application-atom/services'
import { getDomainService } from '@codelab/frontend-application-domain/services'
import {
  getPageService,
  PageRepository,
} from '@codelab/frontend-application-page/services'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import type { IAppAggregate } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
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

@model('@codelab/AppService')
export class AppService
  extends Model({
    appDevelopmentService: prop(() => new AppDevelopmentService({})),
    // appDomainService: prop(() => new AppDomainService({})),
    appProductionService: prop(() => new AppProductionService({})),
    appRepository: prop(() => new AppRepository({})),
    // buildModal: prop(() => new AppModalService({})),
    // createModal: prop(() => new ModalService({})),
    // deleteModal: prop(() => new AppModalService({})),
    pageRepository: prop(() => new PageRepository({})),
    // updateModal: prop(() => new AppModalService({})),
  })
  implements IAppService
{
  @computed
  get appDomainService() {
    return getAppDomainService(this)
  }

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
      authenticatedFetch<IAppAggregate>(`app/export?id=${app.id}`, {
        method: 'GET',
      }),
    )

    downloadJsonAsFile(`${app.slug}.json`, res)

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

  /**
   * This is used for the apps list preview
   *
   * 1) We require the first page to create a URL
   */
  @modelFlow
  loadAppsPreview = _async(function* (this: AppService, where: AppWhere) {
    const { apps, atoms } = yield* _await(this.appRepository.appsList(where))
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
