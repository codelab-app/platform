import type { IAuth0Owner, IPageDTO } from '@codelab/shared/abstract/core'

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageData = IAuth0Owner &
  Pick<IPageDTO, 'app' | 'id' | 'kind' | 'name' | 'url'>

export type IUpdatePageData = Pick<
  IPageDTO,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'url'
>
