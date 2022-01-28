import { ObjectRef } from '@codelab/backend/abstract/core'
import { IBaseType, IVertex, TypeKind } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
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
    case TypeKind.AppType:
      return 'AppType'
    case TypeKind.PageType:
      return 'PageType'
    case TypeKind.ElementType:
      return 'ElementType'
    case TypeKind.RenderPropsType:
      return 'RenderPropsType'
    case TypeKind.ReactNodeType:
      return 'ReactNodeType'
    case TypeKind.UnionType:
      return 'UnionType'
    case TypeKind.MonacoType:
      return 'MonacoType'
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

  @Field(() => ObjectRef, { nullable: true })
  declare owner: Nullish<ObjectRef>

  constructor({ typeKind, name, owner, id }: IBaseType) {
    this.typeKind = typeKind as TTypeKind
    this.name = name
    this.owner = owner
    this.id = id
  }
}
