import type {
  IRouterService,
  UrlParams,
  UrlQuery,
} from '@codelab/frontend/abstract/application'
import { IRouterProps } from '@codelab/frontend/abstract/application'
import { throwIfUndefined } from '@codelab/shared/utils'
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
      appSlug: undefined,
      componentSlug: undefined,
      pageSlug: undefined,
      userSlug: undefined,
    })).withSetter(),
    query: prop<UrlQuery>(() => ({
      primarySidebarKey: undefined,
    })).withSetter(),
  })
  implements IRouterService
{
  static init = init

  @computed
  get appSlug() {
    return this.params.appSlug
  }

  @computed
  get componentSlug() {
    return this.params.componentSlug
  }

  @computed
  get pageSlug() {
    return this.params.pageSlug
  }

  @computed
  get primarySidebarKey() {
    return throwIfUndefined(this.query.primarySidebarKey)
  }

  @computed
  get userSlug() {
    return this.params.userSlug
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
