import { Nullish } from '@codelab/shared/abstract/types'
import { IAuth0Id } from '../user'
import { PageFragment } from './page.fragment.graphql.gen'

export interface ICreatePageDTO {
  id?: string
  slug: string
  // Allow us to specify rootElementId
  rootElementId?: string
  getServerSideProps?: Nullish<string>
  name: string
  appId: string
  auth0Id: IAuth0Id
}

export type IUpdatePageDTO = Omit<
  ICreatePageDTO,
  'id' | 'rootElementId' | 'auth0Id'
>

export type IPageDTO = PageFragment
