import type { IPage } from './page.dto.interface'

export type IUpdatePageData = Pick<
  IPage,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'urlPattern'
>

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageData = Pick<
  IPage,
  'app' | 'id' | 'kind' | 'name' | 'urlPattern'
>
