import {
  ICreateTypeDTO,
  ICreateTypeInput,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import {
  makeAllowedValuesCreateInput,
  makeItemTypeCreateInput,
  makeTypesOfUnionTypeCreateInput,
} from '../../../shared/type-input.factory'

export const createTypeFactory = (
  types: Array<ICreateTypeDTO>,
): Array<ICreateTypeInput> => {
  return types.map((type) => ({
    id: type.id,
    name: type.name,
    owner: {
      connect: { where: { node: { auth0Id: type.auth0Id } } },
    },
    primitiveKind:
      type.kind === ITypeKind.PrimitiveType ? type.primitiveKind : undefined,
    language:
      type.kind === ITypeKind.CodeMirrorType ? type.language : undefined,
    elementKind:
      type.kind === ITypeKind.ElementType ? type.elementKind : undefined,
    allowedValues:
      type.kind === ITypeKind.EnumType
        ? makeAllowedValuesCreateInput(type)
        : undefined,
    itemType:
      type.kind === ITypeKind.ArrayType
        ? makeItemTypeCreateInput(type)
        : undefined,
    typesOfUnionType:
      type.kind === ITypeKind.UnionType
        ? makeTypesOfUnionTypeCreateInput(type)
        : undefined,
  }))
}
