import { ActionFragment } from './action.fragment.graphql.gen'

export interface ICreateActionDTO {
  storeId: string
  name: string
  body: string
}

export type IUpdateActionDTO = Omit<ICreateActionDTO, 'storeId'>

export type IActionDTO = ActionFragment
