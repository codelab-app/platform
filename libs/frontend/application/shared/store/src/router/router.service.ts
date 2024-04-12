import type {
  IRouterParam,
  IRouterQuery,
  IRouterService,
} from '@codelab/frontend/abstract/application'
import { IRouterProps } from '@codelab/frontend/abstract/application'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import type { ParsedUrlQuery } from 'querystring'

const init = (router: IRouterProps) => {
  const { path, pathname, query } = router

  const { appSlug, componentSlug, pageSlug, primarySidebarKey, userSlug } =
    query

  return new RouterService({
    param: {
      appSlug: `${appSlug}`,
      componentSlug: `${componentSlug}`,
      pageSlug: `${pageSlug}`,
      userSlug: `${userSlug}`,
    },
    query: router.query,
    queryString: {
      primarySidebarKey: `${primarySidebarKey}`,
    },
  })
}

@model('@codelab/RouterService')
export class RouterService
  extends Model({
    param: prop<IRouterParam>(() => ({
      appSlug: undefined,
      componentSlug: undefined,
      pageSlug: undefined,
      userSlug: undefined,
    })).withSetter(),
    query: prop<ParsedUrlQuery>(() => ({})).withSetter(),
    queryString: prop<IRouterQuery>(() => ({
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
    return throwIfUndefined(this.queryString.primarySidebarKey)
  }

  @computed
  get userSlug() {
    return this.param.userSlug
  }

  @modelAction
  update(router: IRouterProps) {
    const { path, pathname, query } = router

    const { appSlug, componentSlug, pageSlug, primarySidebarKey, userSlug } =
      query

    this.setParam({
      appSlug: appSlug ? `${appSlug}` : undefined,
      componentSlug: componentSlug ? `${componentSlug}` : undefined,
      pageSlug: pageSlug ? `${pageSlug}` : undefined,
      userSlug: userSlug ? `${userSlug} ` : undefined,
    })

    this.setQuery(query)

    this.setQueryString({
      primarySidebarKey: `${primarySidebarKey}`,
    })
  }
}
