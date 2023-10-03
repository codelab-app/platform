import type * as cg from '@codelab/shared/abstract/codegen'

export type ICreateActionInput =
  | cg.ApiActionCreateInput
  | cg.CodeActionCreateInput

export type IUpdateActionInput =
  | cg.ApiActionUpdateInput
  | cg.CodeActionUpdateInput

export type IConnectActionInput =
  | cg.ApiActionConnectInput
  | cg.CodeActionConnectInput

export type IDisconnectActionInput =
  | cg.ApiActionDisconnectInput
  | cg.CodeActionDisconnectInput

export type IDeleteActionInput =
  | cg.ApiActionDeleteInput
  | cg.CodeActionDeleteInput
