import type * as cg from '@codelab/shared/infra/gql'

export type IActionCreateInput =
  | cg.ApiActionCreateInput
  | cg.CodeActionCreateInput

export type IActionUpdateInput =
  | cg.ApiActionUpdateInput
  | cg.CodeActionUpdateInput

export type IActionDeleteInput =
  | cg.ApiActionDeleteInput
  | cg.CodeActionDeleteInput

export type IActionConnectInput =
  | cg.ApiActionConnectInput
  | cg.CodeActionConnectInput

export type IActionDisconnectInput =
  | cg.ApiActionDisconnectInput
  | cg.CodeActionDisconnectInput
