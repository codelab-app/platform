import type { IPage } from '@codelab/shared/abstract/core'

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageData = Pick<
  IPage,
  'app' | 'authGuard' | 'id' | 'kind' | 'name' | 'url'
>

export type IUpdatePageData = Pick<
  IPage,
  'app' | 'authGuard' | 'id' | 'name' | 'pageContentContainer' | 'url'
>
