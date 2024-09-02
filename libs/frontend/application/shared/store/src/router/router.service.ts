import type { IRouterService } from '@codelab/frontend/abstract/application'
import { IRouterProps } from '@codelab/frontend/abstract/application'
import type { UrlParams, UrlQuery } from '@codelab/frontend/abstract/types'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'

const init = (router: IRouterProps) => {
  const { params, query } = router

  return new RouterService({
    params,
    query,
  })
}

@model('@codelab/RouterService')
export class RouterService
  extends Model({
    params: prop<Partial<UrlParams>>(() => ({
      appId: undefined,
      authGuardId: undefined,
      componentId: undefined,
      interfaceId: undefined,
      pageId: undefined,
      resourceId: undefined,
    })).withSetter(),
    query: prop<UrlQuery>(() => ({
      primarySidebarKey: undefined,
    })).withSetter(),
  })
  implements IRouterService
{
  static init = init

  @computed
  get appId() {
    return this.params.appId
  }

  @computed
  get authGuardId() {
    return this.params.authGuardId
  }

  @computed
  get componentId() {
    return this.params.componentId
  }

  @computed
  get interfaceId() {
    return this.params.interfaceId
  }

  @computed
  get pageId() {
    return this.params.pageId
  }

  @computed
  get primarySidebarKey() {
    return this.query.primarySidebarKey
  }

  @computed
  get resourceId() {
    return this.params.resourceId
  }

  @modelAction
  update({ params, query }: IRouterProps) {
    this.setParams(params)

    this.setQuery(query)
  }
}
