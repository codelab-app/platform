import type { IPage } from '@codelab/shared/abstract/core'

export type IUpdatePageFormData = Pick<
  IPage,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'url'
>

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageFormData = Pick<
  IPage,
  'app' | 'id' | 'kind' | 'name' | 'url'
>
