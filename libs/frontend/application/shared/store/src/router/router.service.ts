import type { IRouterService } from '@codelab/frontend/abstract/application'
import { IRouterProps } from '@codelab/frontend/abstract/application'
import type {
  SearchParams,
  SearchParamsString,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'

const init = (router: IRouterProps) => {
  const { params, searchParams } = router

  return new RouterService({
    params,
    searchParams,
  })
}

@model('@codelab/RouterService')
export class RouterService
  extends Model({
    params: prop<UrlParams>(() => ({
      appId: undefined,
      authGuardId: undefined,
      componentId: undefined,
      interfaceId: undefined,
      pageId: undefined,
      resourceId: undefined,
    })).withSetter(),
    searchParams: prop<SearchParams>(() => ({
      filter: [],
      page: null,
      pageSize: null,
      primarySidebarKey: null,
      search: null,
    })).withSetter(),
  })
  implements IRouterService
{
  static init = init
}
