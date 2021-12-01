import { TypeFragment } from '../graphql/Type.fragment.graphql.gen'

type TypeModelName = TypeFragment['__typename']

type TypeModelsType = {
  [K in TypeModelName]: K
}

/**
 * Pseudo-enum for referencing TypeFragment's typename with type-safe static constants
 */
export const TypeModels: TypeModelsType = {
  PrimitiveType: 'PrimitiveType',
  EnumType: 'EnumType',
  ArrayType: 'ArrayType',
  InterfaceType: 'InterfaceType',
  LambdaType: 'LambdaType',
  ElementType: 'ElementType',
  ComponentType: 'ComponentType',
  RenderPropsType: 'RenderPropsType',
  ReactNodeType: 'ReactNodeType',
  UnionType: 'UnionType',
  MonacoType: 'MonacoType',
  PageType: 'PageType',
  AppType: 'AppType',
}
