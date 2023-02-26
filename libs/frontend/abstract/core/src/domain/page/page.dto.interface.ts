import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElement, IElementDTO } from '../element'
import type { IAuth0Owner } from '../user'

export interface IPageDTO {
  id: string
  rootElement: IEntity
  kind: IPageKind
  descendentElements?: Array<IElementDTO>
  getServerSideProps?: Nullish<string>
  name: string
  app: IEntity
  // owner: IAuth0Owner
  // The container element of the page
  pageContainerElementId?: Nullish<string>
}

export type ICreatePageData = Omit<
  IPageDTO,
  'rootElement' | 'pageContainerElementId' | 'descendentElements' | 'kind'
>

export type IUpdatePageData = Pick<
  IPageDTO,
  'id' | 'getServerSideProps' | 'name' | 'pageContainerElementId' | 'app'
>

// export type IPageDTO = Omit<ICreatePageDTO, 'owner'> & {
//   kind: IPageKind
// }
