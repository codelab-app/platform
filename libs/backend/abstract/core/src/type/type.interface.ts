import type {
  ActionType,
  ActionTypeWhere,
  ArrayType,
  ArrayTypeWhere,
  CodeMirrorType,
  CodeMirrorTypeWhere,
  EnumType,
  EnumTypeWhere,
  InterfaceType,
  InterfaceTypeWhere,
  PrimitiveType,
  PrimitiveTypeWhere,
  ReactNodeType,
  ReactNodeTypeWhere,
  RenderPropType,
  RenderPropTypeWhere,
  RichTextType,
  RichTextTypeWhere,
  UnionType,
  UnionTypeWhere,
} from '@codelab/backend/abstract/codegen'

export type TypeRef = {
  existingId: string
} | null

export type ITypeWhere =
  | ActionTypeWhere
  | ArrayTypeWhere
  | CodeMirrorTypeWhere
  | EnumTypeWhere
  | InterfaceTypeWhere
  | PrimitiveTypeWhere
  | ReactNodeTypeWhere
  | RenderPropTypeWhere
  | RichTextTypeWhere
  | UnionTypeWhere

export type IType =
  | ActionType
  | ArrayType
  | CodeMirrorType
  | EnumType
  | InterfaceType
  | PrimitiveType
  | ReactNodeType
  | RenderPropType
  | RichTextType
  | UnionType
