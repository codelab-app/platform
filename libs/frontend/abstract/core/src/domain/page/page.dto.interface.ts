import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { Overwrite } from 'utility-types'
import type { IElement, IElementDTO } from '../element'
import type { IAuth0Id } from '../user'
import type { PageFragment } from './page.fragment.graphql.gen'

export interface ICreatePageDTO {
  id?: string
  // Allow us to specify rootElementId
  rootElementId: string
  getServerSideProps?: Nullish<string>
  name: string
  appId: string
  ownerId: string
  pageContainerElementId?: Nullish<string>
}

export type IUpdatePageDTO = Omit<
  ICreatePageDTO,
  'id' | 'rootElementId' | 'ownerId' | 'kind'
>

export type IPageDTO = Omit<ICreatePageDTO, 'ownerId'> & {
  kind: IPageKind
}
