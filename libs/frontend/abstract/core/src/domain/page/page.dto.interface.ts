import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElement, IElementDTO } from '../element'
import type { IAuth0Owner } from '../user'

export interface IPageDTO {
  id: string
  kind: IPageKind
  name: string
  // slug: string
  app: IEntity
  rootElement: IEntity
  descendentElements?: Array<IEntity>
  getServerSideProps?: Nullish<string>
  // The container element of the page
  pageContentContainer?: Nullish<IEntity>
}

export type ICreatePageData = Pick<
  IPageDTO,
  'id' | 'name' | 'app' | 'getServerSideProps'
> & {
  owner: IAuth0Owner
  // _compoundName: string
}

export type IUpdatePageData = Pick<
  IPageDTO,
  'id' | 'getServerSideProps' | 'name' | 'pageContentContainer' | 'app'
>
