import { ActionFragment } from './action.fragment.graphql.gen'

export interface ICreateActionDTO {
  name: string
  body: string
}

export type IUpdateActionDTO = ICreateActionDTO

export type IActionDTO = ActionFragment
