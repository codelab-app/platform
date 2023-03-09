import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'

export interface IPageDTO {
  id: string
  kind: IPageKind
  name: string
  // slug: string
  app: IEntity
  rootElement: IEntity
  descendentElements?: Array<IEntity>
  // getServerSideProps?: Nullish<string>
  // The container element of the page
  pageContentContainer?: Nullish<IEntity>
}

export type ICreatePageData = Pick<IPageDTO, 'id' | 'name' | 'app'>

export type IUpdatePageData = Pick<
  IPageDTO,
  'id' | 'name' | 'pageContentContainer' | 'app'
>
