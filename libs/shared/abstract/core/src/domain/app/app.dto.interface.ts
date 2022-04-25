import { AppFragment } from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  name: string
  auth0Id: string
  storeId?: string
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'auth0Id'>

export type IAppDTO = AppFragment
