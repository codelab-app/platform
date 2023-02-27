import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElement, IElementDTO } from '../element'
import type { IAuth0Owner } from '../user'

export interface IPageDTO {
  id: string
  kind: IPageKind
  name: string
  app: IEntity
  rootElement: IEntity
  descendentElements?: Array<IEntity>
  getServerSideProps?: Nullish<string>
  // owner: IAuth0Owner
  // The container element of the page
  pageContentContainer?: Nullish<IEntity>
}

export type ICreatePageData = Omit<
  IPageDTO,
  'rootElement' | 'pageContentContainer' | 'descendentElements' | 'kind'
>

export type IUpdatePageData = Pick<
  IPageDTO,
  'id' | 'getServerSideProps' | 'name' | 'pageContentContainer' | 'app'
>
