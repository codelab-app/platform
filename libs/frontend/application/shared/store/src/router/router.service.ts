import type {
  IRouterProps,
  IRouterService,
} from '@codelab/frontend/abstract/application'
import type {
  SearchParamsProps,
  UrlPathParamsProps,
} from '@codelab/frontend/abstract/types'

import { Validator } from '@codelab/shared/infra/typebox'
import { computed } from 'mobx'
import { Model, model, prop } from 'mobx-keystone'

const init = (router: IRouterProps) => {
  const { pathParams, searchParams } = router

  return new RouterService({
    pathParams,
    searchParams: searchParams ? searchParams : undefined,
  })
}

/**
 * We want to expose validated params, assumed them to be working
 */
@model('@codelab/RouterService')
export class RouterService
  extends Model({
    pathParams: prop<UrlPathParamsProps>(() => ({
      actionId: undefined,
      appId: undefined,
      authGuardId: undefined,
      componentId: undefined,
      interfaceId: undefined,
      pageId: undefined,
      resourceId: undefined,
    })).withSetter(),
    searchParams: prop<SearchParamsProps>(() => ({
      filter: [],
      node: undefined,
      /**
       * Placeholder value to satisfy interface, will be synced to url before using
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
  get actionId() {
    const actionId = this.pathParams.actionId

    Validator.assertsDefined(actionId)

    return actionId
  }

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
    const filter = Array.from(this.searchParams.filter ?? [])

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
    return this.searchParams.node
  }

  @computed
  get page() {
    const page = this.searchParams.page

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
    const pageSize = this.searchParams.pageSize

    Validator.assertsDefined(pageSize)

    return pageSize
  }

  @computed
  get primarySidebarKey() {
    return this.searchParams.primarySidebarKey
  }

  @computed
  get resourceId() {
    const resourceId = this.pathParams.resourceId

    Validator.assertsDefined(resourceId)

    return resourceId
  }

  @computed
  get search() {
    return this.searchParams.search
  }
}
