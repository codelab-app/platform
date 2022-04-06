import * as cg from '@codelab/shared/abstract/codegen'

type AnyType = Required<
  | cg.AppType
  | cg.ArrayType
  | cg.ElementType
  | cg.EnumType
  | cg.InterfaceType
  | cg.LambdaType
  | cg.MonacoType
  | cg.PageType
  | cg.PrimitiveType
  | cg.ReactNodeType
  | cg.RenderPropsType
  | cg.UnionType
>

// This emulates a TS enum, but ties the values to the __typename of the graphql types
// that way we keep the graphql schema as the truth, but still keep typeKind anywhere
// in the app where we need an enum to distinguish between types.
//
// In essence TypeKind is the name of any specific type we add to the graphql schema.
export type TypeKind = AnyType['__typename']

export const TypeKind: { [key in TypeKind]: key } = {
  PrimitiveType: 'PrimitiveType',
  ArrayType: 'ArrayType',
  InterfaceType: 'InterfaceType',
  EnumType: 'EnumType',
  LambdaType: 'LambdaType',
  ElementType: 'ElementType',
  RenderPropsType: 'RenderPropsType',
  ReactNodeType: 'ReactNodeType',
  UnionType: 'UnionType',
  MonacoType: 'MonacoType',
  PageType: 'PageType',
  AppType: 'AppType',
}
