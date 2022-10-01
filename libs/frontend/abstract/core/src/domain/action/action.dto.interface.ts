import { IProp } from '../prop'
import { IActionKind } from './action-kind.enum'
import { IGraphQLActionConfig, IRestActionConfig } from './actions'
import { ActionFragment } from './fragments'

export type IApiActionConfig = IProp<IRestActionConfig | IGraphQLActionConfig>

export interface IActionBaseDTO {
  id: string
  name: string
  storeId: string
  type: IActionKind

  code?: string

  resourceId?: string
  config?: IRestActionConfig | IGraphQLActionConfig
  successActionId?: string
  errorActionId?: string

  actionsIds?: Array<string>
}

export type ICreateActionDTO = IActionBaseDTO

export type IUpdateActionDTO = IActionBaseDTO

export type IActionDTO = ActionFragment
