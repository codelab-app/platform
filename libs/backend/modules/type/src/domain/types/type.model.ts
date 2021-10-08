import { IBaseType, IVertex, TypeKind } from '@codelab/shared/abstract/core'
import {
  Field,
  ID,
  InterfaceType,
  registerEnumType,
  ResolveTypeFn,
} from '@nestjs/graphql'

registerEnumType(TypeKind, { name: 'TypeKind' })

const resolveType: ResolveTypeFn = (value: Type<any>) => {
  switch (value.typeKind) {
    case TypeKind.PrimitiveType:
      return 'PrimitiveType'
    case TypeKind.ArrayType:
      return 'ArrayType'
    case TypeKind.InterfaceType:
      return 'InterfaceType'
    case TypeKind.EnumType:
      return 'EnumType'
    case TypeKind.LambdaType:
      return 'LambdaType'
    case TypeKind.ElementType:
      return 'ElementType'
    case TypeKind.ComponentType:
      return 'ComponentType'
    case TypeKind.RenderPropsType:
      return 'RenderPropsType'
    case TypeKind.ReactNodeType:
      return 'ReactNodeType'
    case TypeKind.UnionType:
      return 'UnionType'
  }

  throw new Error(
    'Unrecognized type, add new types in type.model.ts -> resolveType',
  )
}

@InterfaceType({ isAbstract: true, resolveType })
export class Type<TTypeKind extends TypeKind> implements IVertex, IBaseType {
  @Field(() => TypeKind)
  typeKind: TTypeKind

  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  constructor(typeKind: TTypeKind) {
    this.typeKind = typeKind
  }
}
