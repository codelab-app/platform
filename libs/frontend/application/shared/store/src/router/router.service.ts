import type {
  IRouterService,
  UrlParams,
  UrlQuery,
} from '@codelab/frontend/abstract/application'
import { IRouterProps } from '@codelab/frontend/abstract/application'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import type { ParsedUrlQuery } from 'querystring'

const init = (router: IRouterProps) => {
  const { param, query } = router

  return new RouterService({
    param,
    query,
  })
}

@model('@codelab/RouterService')
export class RouterService
  extends Model({
    param: prop<UrlParams>(() => ({
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
    return this.param.appSlug
  }

  @computed
  get componentSlug() {
    return this.param.componentSlug
  }

  @computed
  get pageSlug() {
    return this.param.pageSlug
  }

  @computed
  get primarySidebarKey() {
    return throwIfUndefined(this.query.primarySidebarKey)
  }

  @computed
  get userSlug() {
    return this.param.userSlug
  }

  @modelAction
  update({ param, query }: IRouterProps) {
    this.setParam(param)
    this.setQuery(query)
  }
}
