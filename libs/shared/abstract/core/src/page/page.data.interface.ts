import type { IPageDto } from './page.dto.interface'

export type IPageUpdateFormData = Pick<
  IPageDto,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'urlPattern'
>

/**
 * IOwnerSchema is required for store api
 */
export type IPageCreateFormData = Pick<
  IPageDto,
  'app' | 'id' | 'kind' | 'name' | 'urlPattern'
>
