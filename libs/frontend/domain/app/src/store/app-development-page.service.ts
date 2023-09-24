import { getAppService, getUserService } from '@codelab/frontend/abstract/core'
import { getResourceService } from '@codelab/frontend/domain/resource'
import { AppProperties, PageProperties } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'

/**
 * Create a dedicated class for fetching and hydrating required data for an app/page to function
 *
 * Too much logic inside AppService
 */
@model('@codelab/AppDevelopmentPage')
export class AppDevelopmentPage extends Model({}) {
  // execute() {}

  @modelFlow
  loadDevelopmentPage = _async(function* (
    this: AppDevelopmentPage,
    appName: string,
    pageName: string,
  ) {
    const user = this.userService.user
    const appCompositeKey = AppProperties.appCompositeKey(appName, user)

    /**
     * Fetch app first, since app could be not loaded
     */
    const appData = yield* _await(
      this.appService.appRepository.findOne({
        compositeKey: appCompositeKey,
      }),
    )

    if (!appData) {
      throw new Error('App data not found')
    }

    console.debug('appData', appData)

    this.loadPages(appData)

    this.appService.add(appData)

    console.debug('loaded app', app)

    const pageCompositeKey = PageProperties.pageCompositeKey(pageName, app)

    const pageData = yield* _await(
      pageApi.GetDevelopmentPage({ appCompositeKey, pageCompositeKey }),
    )

    console.debug('pageApi.GetDevelopmentPage()', pageData)

    const {
      apps: [appData],
      resources,
    } = pageData

    if (!appData) {
      return null
    }

    /**
     * Load app, pages, elements
     */
    this.loadPages({ pages: appData.pages as Array<BuilderPageFragment> })

    // write cache for resources
    this.resourceService.load(resources)

    return this.appService.add(appData)
  })

  @computed
  private get appService() {
    return getAppService(this)
  }

  @computed
  private get resourceService() {
    return getResourceService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
