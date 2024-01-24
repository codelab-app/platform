import type {
  IRouterPath,
  IRouterQuery,
  IRouterService,
} from '@codelab/frontend/abstract/application'
import { throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { ParsedUrlQuery } from 'querystring'

const init = (routerQuery: ParsedUrlQuery) => {
  const { appSlug, componentSlug, pageSlug, primarySidebarKey, userSlug } =
    routerQuery

  return new RouterService({
    path: {
      appSlug: `${appSlug}`,
      componentSlug: `${componentSlug}`,
      pageSlug: `${pageSlug}`,
      userSlug: `${userSlug}`,
    },
    query: {
      primarySidebarKey: `${primarySidebarKey}`,
    },
  })
}

@model('@codelab/RouterService')
export class RouterService
  extends Model({
    path: prop<IRouterPath>(() => ({
      appSlug: undefined,
      componentSlug: undefined,
      pageSlug: undefined,
      userSlug: undefined,
    })).withSetter(),
    query: prop<IRouterQuery>(() => ({
      primarySidebarKey: undefined,
    })).withSetter(),
  })
  implements IRouterService
{
  static init = init

  @computed
  get appSlug() {
    return throwIfUndefined(this.path.appSlug)
  }

  @computed
  get componentSlug() {
    return throwIfUndefined(this.path.componentSlug)
  }

  @computed
  get pageSlug() {
    return throwIfUndefined(this.path.pageSlug)
  }

  @computed
  get userSlug() {
    return throwIfUndefined(this.path.userSlug)
  }

  @computed
  get primarySidebarKey() {
    return throwIfUndefined(this.query.primarySidebarKey)
  }

  @modelAction
  update(routerQuery: ParsedUrlQuery) {
    const { appSlug, componentSlug, pageSlug, primarySidebarKey, userSlug } =
      routerQuery

    this.setPath({
      appSlug: `${appSlug ?? ''}`,
      componentSlug: `${componentSlug ?? ''}`,
      pageSlug: `${pageSlug ?? ''}`,
      userSlug: `${userSlug ?? ''}`,
    })

    this.setQuery({
      primarySidebarKey: `${primarySidebarKey}`,
    })
  }
}
