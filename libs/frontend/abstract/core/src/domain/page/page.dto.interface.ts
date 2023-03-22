import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'

export interface IPageDTO {
  // slug: string
  app: IEntity
  id: string
  kind: IPageKind
  name: string
  // getServerSideProps?: Nullish<string>
  // The container element of the page
  pageContentContainer?: Nullish<IEntity>
  rootElement: IEntity
}

export type ICreatePageData = Pick<IPageDTO, 'app' | 'id' | 'name'>

export type IUpdatePageData = Pick<
  IPageDTO,
  'app' | 'id' | 'name' | 'pageContentContainer'
>
