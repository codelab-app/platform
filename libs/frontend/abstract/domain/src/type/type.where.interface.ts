import type * as cg from '@codelab/shared/abstract/codegen'

export type ITypeWhere = cg.ActionTypeWhere &
  cg.AppTypeWhere &
  cg.ArrayTypeWhere &
  cg.CodeMirrorTypeWhere &
  cg.ElementTypeWhere &
  cg.EnumTypeWhere &
  cg.InterfaceTypeWhere &
  cg.LambdaTypeWhere &
  cg.PageTypeWhere &
  cg.PrimitiveTypeWhere &
  cg.ReactNodeTypeWhere &
  cg.RenderPropTypeWhere &
  cg.UnionTypeWhere

//
// Get
//
export type IAllTypesOptions = cg.AppTypeOptions &
  cg.ArrayTypeOptions &
  cg.CodeMirrorTypeOptions &
  cg.ElementTypeOptions &
  cg.EnumTypeOptions &
  cg.InterfaceTypeOptions &
  cg.LambdaTypeOptions &
  cg.PageTypeOptions &
  cg.PrimitiveTypeOptions &
  cg.ReactNodeTypeOptions &
  cg.RenderPropTypeOptions &
  cg.UnionTypeOptions
