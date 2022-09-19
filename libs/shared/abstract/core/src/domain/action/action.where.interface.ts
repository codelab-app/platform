import * as cg from '@codelab/shared/abstract/codegen'

export type IAnyActionWhere = cg.CustomActionWhere & cg.ResourceActionWhere

export type IAllActionsOptions = cg.CustomActionOptions &
  cg.ResourceActionOptions
