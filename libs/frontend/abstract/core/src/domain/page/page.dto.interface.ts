import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IPageDTO {
  app: IEntity
  id: string
  kind: IPageKind
  name: string
  // The container element of the page
  pageContentContainer?: Nullish<IEntity>
  rootElement: IEntity
  store: IEntity
  url: string
}

export type ISystemPageDTO = IOwnerSchema &
  Pick<IPageDTO, 'app' | 'kind' | 'name' | 'url'>

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageData = IOwnerSchema &
  Pick<IPageDTO, 'app' | 'id' | 'name' | 'url'>

export type IUpdatePageData = Pick<
  IPageDTO,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'url'
>
