import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { IPageKind } from './page-kind.enum'

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
