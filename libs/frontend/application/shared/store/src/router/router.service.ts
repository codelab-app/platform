import type { IRouterService } from '@codelab/frontend/abstract/application'
import { IRouterProps } from '@codelab/frontend/abstract/application'
import type {
  UrlPathParams,
  UrlQueryParams,
} from '@codelab/frontend/abstract/types'
import { Validator } from '@codelab/shared/infra/schema'
import { computed } from 'mobx'
import { Model, model, prop } from 'mobx-keystone'
import { parseUrlQueryParams } from './useUrlQueryParams.hook'

const init = (router: IRouterProps) => {
  const { pathParams, queryParams } = router

  return new RouterService({
    pathParams,
    queryParams: queryParams ? parseUrlQueryParams(queryParams) : undefined,
  })
}

/**
 * We want to expose validated params, assumed them to be working
 */
@model('@codelab/RouterService')
export class RouterService
  extends Model({
    pathParams: prop<UrlPathParams>(() => ({
      appId: undefined,
      authGuardId: undefined,
      componentId: undefined,
      interfaceId: undefined,
      pageId: undefined,
      resourceId: undefined,
    })).withSetter(),
    queryParams: prop<UrlQueryParams>(() => ({
      filter: [] as Array<string>,
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
    return this.pathParams.appId
  }

  @computed
  get authGuardId() {
    return this.pathParams.authGuardId
  }

  @computed
  get componentId() {
    return this.pathParams.componentId
  }

  @computed
  get filter() {
    return this.queryParams.filter
  }

  @computed
  get interfaceId() {
    return this.pathParams.interfaceId
  }

  @computed
  get page() {
    return this.queryParams.page
  }

  @computed
  get pageId() {
    return this.pathParams.pageId
  }

  @computed
  get pageSize() {
    return this.queryParams.pageSize
  }

  @computed
  get primarySidebarKey() {
    return this.queryParams.primarySidebarKey
  }

  @computed
  get resourceId() {
    return this.pathParams.resourceId
  }

  @computed
  get search() {
    return this.queryParams.search
  }
}
