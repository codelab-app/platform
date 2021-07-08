import { __TypeFragment } from '@codelab/codegen/graphql'

type TypeModelName = __TypeFragment['__typename']

type TypeModelsType = {
  [K in TypeModelName]: K
}

export const TypeModels: TypeModelsType = {
  SimpleType: 'SimpleType',
  EnumType: 'EnumType',
  ArrayType: 'ArrayType',
  Interface: 'Interface',
}
