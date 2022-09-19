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
  | cg.CustomActionCreateInput
  | cg.ResourceActionCreateInput

export type IUpdateActionInput =
  | cg.CustomActionUpdateInput
  | cg.ResourceActionUpdateInput

export type IConnectActionInput =
  | cg.CustomActionConnectInput
  | cg.ResourceActionConnectInput

export type IDisconnectActionInput =
  | cg.CustomActionDisconnectInput
  | cg.ResourceActionDisconnectInput

export type IDeleteActionInput =
  | cg.CustomActionDeleteInput
  | cg.ResourceActionDeleteInput
