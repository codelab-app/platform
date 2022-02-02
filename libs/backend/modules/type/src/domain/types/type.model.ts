import { ObjectRef } from '@codelab/backend/abstract/core'
import {
  IBaseType,
  isAdmin,
  IType,
  IUser,
  IVertex,
  TypeKind,
  TypeSchema,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  Field,
  ID,
  InterfaceType,
  registerEnumType,
  ResolveTypeFn,
} from '@nestjs/graphql'
import { CreateTypeInput } from '../..'
import { CreateTypeInputFactory } from '../../use-cases/type/create-type/create-type-input.factory'

registerEnumType(TypeKind, { name: 'TypeKind' })

const resolveType: ResolveTypeFn = (value: Type<TypeKind>) => {
  switch (value.typeKind) {
    case TypeKind.PrimitiveType:
      return `${TypeKind.PrimitiveType}`
    case TypeKind.ArrayType:
      return `${TypeKind.ArrayType}`
    case TypeKind.InterfaceType:
      return `${TypeKind.InterfaceType}`
    case TypeKind.EnumType:
      return `${TypeKind.EnumType}`
    case TypeKind.LambdaType:
      return `${TypeKind.LambdaType}`
    case TypeKind.AppType:
      return `${TypeKind.AppType}`
    case TypeKind.PageType:
      return `${TypeKind.PageType}`
    case TypeKind.ElementType:
      return `${TypeKind.ElementType}`
    case TypeKind.RenderPropsType:
      return `${TypeKind.RenderPropsType}`
    case TypeKind.ReactNodeType:
      return `${TypeKind.ReactNodeType}`
    case TypeKind.UnionType:
      return `${TypeKind.UnionType}`
    case TypeKind.MonacoType:
      return `${TypeKind.MonacoType}`
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

  static create(data: CreateTypeInput, currentUser?: IUser): IType {
    const type = CreateTypeInputFactory.toType(data)

    return TypeSchema.parse({
      ...type,
      id: type.id ?? '',
      /** We use owner field to determine policy */
      owner:
        isAdmin(currentUser) || !currentUser
          ? undefined
          : { id: currentUser.id },
    })
  }
}
