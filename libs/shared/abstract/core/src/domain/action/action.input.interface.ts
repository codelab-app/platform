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
  | cg.CodeActionCreateInput
  | cg.ApiActionCreateInput

export type IUpdateActionInput =
  | cg.CodeActionUpdateInput
  | cg.ApiActionUpdateInput

export type IConnectActionInput =
  | cg.CodeActionConnectInput
  | cg.ApiActionConnectInput

export type IDisconnectActionInput =
  | cg.CodeActionDisconnectInput
  | cg.ApiActionDisconnectInput

export type IDeleteActionInput =
  | cg.CodeActionDeleteInput
  | cg.ApiActionDeleteInput
