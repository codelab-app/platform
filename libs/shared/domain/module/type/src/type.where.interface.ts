import type {
  ActionTypeWhere,
  AppTypeOptions,
  AppTypeWhere,
  ArrayTypeOptions,
  ArrayTypeWhere,
  CodeMirrorTypeOptions,
  CodeMirrorTypeWhere,
  ElementTypeOptions,
  ElementTypeWhere,
  EnumTypeOptions,
  EnumTypeWhere,
  InterfaceTypeOptions,
  InterfaceTypeWhere,
  LambdaTypeOptions,
  LambdaTypeWhere,
  PageTypeOptions,
  PageTypeWhere,
  PrimitiveTypeOptions,
  PrimitiveTypeWhere,
  ReactNodeTypeOptions,
  ReactNodeTypeWhere,
  RenderPropTypeOptions,
  RenderPropTypeWhere,
  RichTextTypeOptions,
  RichTextTypeWhere,
  UnionTypeOptions,
  UnionTypeWhere,
} from '@codelab/shared-infra-gqlgen'

export type ITypeWhere = ActionTypeWhere &
  AppTypeWhere &
  ArrayTypeWhere &
  CodeMirrorTypeWhere &
  ElementTypeWhere &
  EnumTypeWhere &
  InterfaceTypeWhere &
  LambdaTypeWhere &
  PageTypeWhere &
  PrimitiveTypeWhere &
  ReactNodeTypeWhere &
  RenderPropTypeWhere &
  RichTextTypeWhere &
  UnionTypeWhere

//
// Get
//
export type IAllTypesOptions = AppTypeOptions &
  ArrayTypeOptions &
  CodeMirrorTypeOptions &
  ElementTypeOptions &
  EnumTypeOptions &
  InterfaceTypeOptions &
  LambdaTypeOptions &
  PageTypeOptions &
  PrimitiveTypeOptions &
  ReactNodeTypeOptions &
  RenderPropTypeOptions &
  RichTextTypeOptions &
  UnionTypeOptions
