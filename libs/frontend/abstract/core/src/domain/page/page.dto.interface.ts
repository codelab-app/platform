import type { Nullish } from '@codelab/shared/abstract/types'
import type { IAuth0Id } from '../user'
import type { PageFragment } from './page.fragment.graphql.gen'

export interface ICreatePageDTO {
  id?: string
  // Allow us to specify rootElementId
  rootElementId?: string
  getServerSideProps?: Nullish<string>
  name: string
  appId: string
  auth0Id: IAuth0Id
  pageContainerElementId?: Nullish<string>
}

export type IUpdatePageDTO = Omit<
  ICreatePageDTO,
  'id' | 'rootElementId' | 'auth0Id' | 'kind'
>

export type IPageDTO = PageFragment
