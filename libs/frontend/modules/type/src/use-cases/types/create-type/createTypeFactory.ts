import {
  ICreateTypeDTO,
  ICreateTypeInput,
  TypeKind,
} from '@codelab/shared/abstract/core'
import {
  makeAllowedValuesCreateInput,
  makeFieldsCreateInput,
  makeItemTypeCreateInput,
  makeTypesOfUnionTypeCreateInput,
} from '../../../shared/type-input.factory'

export const createTypeInput = (
  type: ICreateTypeDTO,
  currentUserAuth0Id: string,
): ICreateTypeInput => {
  return {
    id: type.id,
    name: type.name,
    owner: {
      connect: { where: { node: { auth0Id: currentUserAuth0Id } } },
    },
    primitiveKind:
      type.kind === TypeKind.PrimitiveType ? type.primitiveKind : undefined,
    language: type.kind === TypeKind.MonacoType ? type.language : undefined,
    elementKind:
      type.kind === TypeKind.ElementType ? type.elementKind : undefined,
    allowedValues:
      type.kind === TypeKind.EnumType
        ? makeAllowedValuesCreateInput(type)
        : undefined,
    itemType:
      type.kind === TypeKind.ArrayType
        ? makeItemTypeCreateInput(type)
        : undefined,
    typesOfUnionType:
      type.kind === TypeKind.UnionType
        ? makeTypesOfUnionTypeCreateInput(type)
        : undefined,
    fields:
      type.kind === TypeKind.InterfaceType
        ? makeFieldsCreateInput(type)
        : undefined,
  }
}
