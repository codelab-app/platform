import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElement } from '../element'
import type { IAuth0Owner } from '../user'

export interface ICreatePageDTO {
  id: string
  // Allow us to specify rootElementId
  rootElement: IEntity
  // These are data used to hydrate the page
  descendentElements?: Array<Ref<IElement>>
  getServerSideProps?: Nullish<string>
  name: string
  app: IEntity
  // owner: IAuth0Owner
  pageContainerElementId?: Nullish<string>
}

export type IUpdatePageDTO = Pick<
  ICreatePageDTO,
  'id' | 'getServerSideProps' | 'name' | 'pageContainerElementId' | 'app'
>

export type IPageDTO = Omit<ICreatePageDTO, 'auth0Id'> & {
  kind: IPageKind
}
