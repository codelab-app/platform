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
    queryParams: parseUrlQueryParams(queryParams),
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
      filter: [],
      page: undefined,
      pageSize: undefined,
      primarySidebarKey: undefined,
      search: undefined,
    })).withSetter(),
  })
  implements IRouterService
{
  static init = init

  @computed
  get appId() {
    return Validator.parseDefined(this.pathParams.appId)
  }

  @computed
  get authGuardId() {
    return Validator.parseDefined(this.pathParams.authGuardId)
  }

  @computed
  get componentId() {
    return Validator.parseDefined(this.pathParams.componentId)
  }

  @computed
  get filter() {
    return Validator.parseDefined(this.queryParams.filter)
  }

  @computed
  get interfaceId() {
    return Validator.parseDefined(this.pathParams.interfaceId)
  }

  @computed
  get page() {
    return Validator.parseDefined(this.queryParams.page)
  }

  @computed
  get pageId() {
    return Validator.parseDefined(this.pathParams.pageId)
  }

  @computed
  get pageSize() {
    return Validator.parseDefined(this.queryParams.pageSize)
  }

  @computed
  get primarySidebarKey() {
    return Validator.parseDefined(this.queryParams.primarySidebarKey)
  }

  @computed
  get resourceId() {
    return Validator.parseDefined(this.pathParams.resourceId)
  }

  @computed
  get search() {
    return Validator.parseDefined(this.queryParams.search)
  }
}
