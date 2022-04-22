import { AppFragment } from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  name: string
  storeId: string
}

export type IUpdateAppDTO = ICreateAppDTO

export type IAppDTO = AppFragment
