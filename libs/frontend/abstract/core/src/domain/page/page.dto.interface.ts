import type { IPageKind } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

export interface ICreatePageDTO {
  id?: string
  // Allow us to specify rootElementId
  rootElementId: string
  getServerSideProps?: Nullish<string>
  name: string
  appId: string
  auth0Id: string
  pageContainerElementId?: Nullish<string>
}

export type IUpdatePageDTO = Omit<
  ICreatePageDTO,
  'id' | 'rootElementId' | 'auth0Id' | 'kind'
>

export type IPageDTO = Omit<ICreatePageDTO, 'auth0Id'> & {
  kind: IPageKind
}
