import type * as cg from '@codelab/shared/abstract/codegen'

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
