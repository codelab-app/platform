import * as cg from '@codelab/shared/abstract/codegen'

export type IActionWhere = cg.CustomActionWhere &
  cg.ResourceActionWhere &
  cg.PipelineActionWhere

export type IAllActionsOptions = cg.CustomActionOptions &
  cg.ResourceActionOptions &
  cg.PipelineActionOptions
