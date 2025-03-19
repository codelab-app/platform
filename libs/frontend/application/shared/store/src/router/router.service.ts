import type {
  IRouterProps,
  IRouterService,
} from '@codelab/frontend/abstract/application'
import type {
  SearchParamsProps,
  UrlParamsProps,
} from '@codelab/frontend/abstract/types'

import { Validator } from '@codelab/shared/infra/typebox'
import { computed } from 'mobx'
import { Model, model, prop } from 'mobx-keystone'

const init = (router: IRouterProps) => {
  const { searchParams } = router

  return new RouterService({
    searchParams: searchParams ? searchParams : undefined,
  })
}

/**
 * We want to expose validated params, assumed them to be working
 */
@model('@codelab/RouterService')
export class RouterService
  extends Model({
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
  get filter() {
    const filter = Array.from(this.searchParams.filter ?? [])

    Validator.assertsDefined(filter)

    return filter
  }

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
  get search() {
    return this.searchParams.search
  }
}
