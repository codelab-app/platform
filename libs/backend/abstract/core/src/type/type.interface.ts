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
} from '@codelab/shared/infra/gql'

export type TypeRef = {
  existingId: string
} | null
