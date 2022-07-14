import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IProp } from '../prop'
import { IActionKind } from './action-kind.enum'
import { IGraphQLActionConfig, IRestActionConfig } from './actions'
import { ActionFragment } from './fragments'

export type IResourceActionConfig = IProp<
  IRestActionConfig | IGraphQLActionConfig
>

export interface IActionBaseDTO {
  id: string
  name: string
  runOnInit: boolean
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

export type IActionExport =
  | OGM_TYPES.CustomAction
  | OGM_TYPES.ResourceAction
  | OGM_TYPES.PipelineAction
