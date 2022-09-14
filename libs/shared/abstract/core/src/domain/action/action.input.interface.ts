import * as cg from '@codelab/shared/abstract/codegen'
import {
  CustomActionCreateInput,
  PipelineActionCreateInput,
  ResourceActionCreateInput,
} from '@codelab/shared/abstract/codegen'

export interface IUpdateActionArgs {
  update: IUpdateActionInput
  disconnect?: IDisconnectActionInput
  connect?: IConnectActionInput
  delete?: IDeleteActionInput
}

export type ICreateActionInput =
  | CustomActionCreateInput
  | ResourceActionCreateInput
  | PipelineActionCreateInput

export type IUpdateActionInput =
  | cg.CustomActionUpdateInput
  | cg.ResourceActionUpdateInput
  | cg.PipelineActionUpdateInput

export type IConnectActionInput =
  | cg.CustomActionConnectInput
  | cg.ResourceActionConnectInput
  | cg.PipelineActionConnectInput

export type IDisconnectActionInput =
  | cg.CustomActionDisconnectInput
  | cg.ResourceActionDisconnectInput
  | cg.PipelineActionDisconnectInput

export type IDeleteActionInput =
  | cg.CustomActionDeleteInput
  | cg.ResourceActionDeleteInput
  | cg.PipelineActionDeleteInput
