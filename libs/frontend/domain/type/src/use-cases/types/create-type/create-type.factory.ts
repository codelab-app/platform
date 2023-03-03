import type {
  ICreateTypeData,
  ICreateTypeInput,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  makeAllowedValuesCreateInput,
  makeItemTypeCreateInput,
  makeTypesOfUnionTypeCreateInput,
} from '@codelab/shared/domain/mapper'

export const createTypeFactory = (
  types: Array<ICreateTypeData>,
): Array<ICreateTypeInput> => {
  return types.map((type) => ({
    allowedValues:
      type.kind === ITypeKind.EnumType
        ? makeAllowedValuesCreateInput(type)
        : undefined,
    elementKind:
      type.kind === ITypeKind.ElementType ? type.elementKind : undefined,
    id: type.id,
    itemType:
      type.kind === ITypeKind.ArrayType
        ? makeItemTypeCreateInput(type)
        : undefined,
    kind: type.kind,
    language:
      type.kind === ITypeKind.CodeMirrorType ? type.language : undefined,
    name: type.name,
    owner: connectAuth0Owner(type.owner),
    primitiveKind:
      type.kind === ITypeKind.PrimitiveType ? type.primitiveKind : undefined,
    typesOfUnionType:
      type.kind === ITypeKind.UnionType
        ? makeTypesOfUnionTypeCreateInput(type)
        : undefined,
  }))
}
