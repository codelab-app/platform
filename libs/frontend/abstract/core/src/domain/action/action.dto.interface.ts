import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IProp } from '../prop'
import type { IGraphQLActionConfig, IRestActionConfig } from './actions'
import type { ActionFragment } from './fragments'

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
}

export type ICreateActionDTO = IActionBaseDTO

export type IUpdateActionDTO = IActionBaseDTO

export type IActionDTO = ActionFragment
