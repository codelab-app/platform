import type * as cg from '@codelab/shared/abstract/codegen'

export type ITypeWhere = cg.AppTypeWhere &
  cg.ActionTypeWhere &
  cg.ArrayTypeWhere &
  cg.ElementTypeWhere &
  cg.EnumTypeWhere &
  cg.InterfaceTypeWhere &
  cg.LambdaTypeWhere &
  cg.CodeMirrorTypeWhere &
  cg.PageTypeWhere &
  cg.PrimitiveTypeWhere &
  cg.ReactNodeTypeWhere &
  cg.RenderPropsTypeWhere &
  cg.UnionTypeWhere

//
// Get
//
export type IAllTypesOptions = cg.AppTypeOptions &
  cg.ArrayTypeOptions &
  cg.ElementTypeOptions &
  cg.EnumTypeOptions &
  cg.InterfaceTypeOptions &
  cg.LambdaTypeOptions &
  cg.CodeMirrorTypeOptions &
  cg.PageTypeOptions &
  cg.PrimitiveTypeOptions &
  cg.ReactNodeTypeOptions &
  cg.RenderPropsTypeOptions &
  cg.UnionTypeOptions
