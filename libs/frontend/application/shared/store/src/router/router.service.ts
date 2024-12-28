import type { IRouterService } from '@codelab/frontend/abstract/application'
import type {
  UrlPathParamsProps,
  UrlQueryParamsProps,
} from '@codelab/frontend/abstract/types'

import { IRouterProps } from '@codelab/frontend/abstract/application'
import { Validator } from '@codelab/shared/infra/validation'
import { computed } from 'mobx'
import { Model, model, prop } from 'mobx-keystone'

import { parseQueryParamPageProps } from './query-params'

const init = (router: IRouterProps) => {
  const { pathParams, queryParams } = router

  return new RouterService({
    pathParams,
    queryParams: queryParams
      ? parseQueryParamPageProps(queryParams)
      : undefined,
  })
}

/**
 * We want to expose validated params, assumed them to be working
 */
@model('@codelab/RouterService')
export class RouterService
  extends Model({
    pathParams: prop<UrlPathParamsProps>(() => ({
      appId: undefined,
      authGuardId: undefined,
      componentId: undefined,
      interfaceId: undefined,
      pageId: undefined,
      resourceId: undefined,
    })).withSetter(),
    queryParams: prop<UrlQueryParamsProps>(() => ({
      filter: [],
      node: undefined,
      /**
       * Placeholder value to satisfy interface, will be synced to url before useing
       */
      page: 0,
      pageSize: 0,
      primarySidebarKey: undefined,
      search: undefined,
    })).withSetter(),
  })
  implements IRouterService
{
  static init = init

  @computed
  get appId() {
    const appId = this.pathParams.appId

    Validator.assertsDefined(appId)

    return appId
  }

  @computed
  get authGuardId() {
    const authGuardId = this.pathParams.authGuardId

    Validator.assertsDefined(authGuardId)

    return authGuardId
  }

  @computed
  get componentId() {
    const componentId = this.pathParams.componentId

    Validator.assertsDefined(componentId)

    return componentId
  }

  @computed
  get filter() {
    const filter = Array.from(this.queryParams.filter ?? [])

    Validator.assertsDefined(filter)

    return filter
  }

  @computed
  get interfaceId() {
    const interfaceId = this.pathParams.interfaceId

    Validator.assertsDefined(interfaceId)

    return interfaceId
  }

  @computed
  get node() {
    return this.queryParams.node
  }

  @computed
  get page() {
    const page = this.queryParams.page

    Validator.assertsDefined(page)

    return page
  }

  @computed
  get pageId() {
    const pageId = this.pathParams.pageId

    Validator.assertsDefined(pageId)

    return pageId
  }

  @computed
  get pageSize() {
    const pageSize = this.queryParams.pageSize

    Validator.assertsDefined(pageSize)

    return pageSize
  }

  @computed
  get primarySidebarKey() {
    return this.queryParams.primarySidebarKey
  }

  @computed
  get resourceId() {
    const resourceId = this.pathParams.resourceId

    Validator.assertsDefined(resourceId)

    return resourceId
  }

  @computed
  get search() {
    return this.queryParams.search
  }
}
