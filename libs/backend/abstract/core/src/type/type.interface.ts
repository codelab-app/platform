import type {
  ActionType,
  ActionTypeWhere,
  ArrayType,
  ArrayTypeWhere,
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
  UnionType,
  UnionTypeWhere,
} from '@codelab/backend/abstract/codegen'

export type TypeRef = {
  existingId: string
} | null

export type ITypeWhere =
  | ActionTypeWhere
  | ArrayTypeWhere
  | EnumTypeWhere
  | InterfaceTypeWhere
  | PrimitiveTypeWhere
  | ReactNodeTypeWhere
  | RenderPropTypeWhere
  | UnionTypeWhere

export type IType =
  | ActionType
  | ArrayType
  | EnumType
  | InterfaceType
  | PrimitiveType
  | ReactNodeType
  | RenderPropType
  | UnionType
