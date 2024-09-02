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
    params: prop<UrlParams>(() => ({
      appId: undefined,
      componentId: undefined,
      pageId: undefined,
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
  get componentId() {
    return this.params.componentId
  }

  @computed
  get pageId() {
    return this.params.pageId
  }

  @computed
  get primarySidebarKey() {
    return this.query.primarySidebarKey
  }

  @modelAction
  update({ params, query }: IRouterProps) {
    if (params) {
      this.setParams(params)
    }

    if (query) {
      this.setQuery(query)
    }
  }
}
