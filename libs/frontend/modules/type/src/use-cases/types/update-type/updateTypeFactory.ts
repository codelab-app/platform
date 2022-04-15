import {
  IAnyType,
  IUpdateTypeArgs,
  TypeKind,
} from '@codelab/shared/abstract/core'
import {
  makeAllowedValuesCreateInput,
  makeFieldsCreateInput,
  makeItemTypeCreateInput,
  makeTypesOfUnionTypeCreateInput,
} from '../../../shared/type-input.factory'

export const typeUpdateInputFactory = (type: IAnyType): IUpdateTypeArgs => {
  // For some reason if the disconnect and delete are in the update section it throws an error
  return {
    update: {
      name: type.name,
      primitiveKind:
        type.typeKind === TypeKind.PrimitiveType
          ? type.primitiveKind
          : undefined,
      language:
        type.typeKind === TypeKind.MonacoType ? type.language : undefined,
      elementKind:
        type.typeKind === TypeKind.ElementType ? type.elementKind : undefined,
      itemType:
        type.typeKind === TypeKind.ArrayType
          ? makeItemTypeCreateInput(type)
          : undefined,
      typesOfUnionType:
        type.typeKind === TypeKind.UnionType
          ? [makeTypesOfUnionTypeCreateInput(type)]
          : undefined,
      fields:
        type.typeKind === TypeKind.InterfaceType
          ? [makeFieldsCreateInput(type)]
          : undefined,
      allowedValues:
        type.typeKind === TypeKind.EnumType
          ? [makeAllowedValuesCreateInput(type)]
          : undefined,
    },
    disconnect: {
      itemType:
        type.typeKind === TypeKind.ArrayType && type.itemType
          ? { where: { node: { id_NOT: type.itemType.id } } }
          : undefined,
      typesOfUnionType:
        type.typeKind === TypeKind.UnionType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.typesOfUnionType.map((tu) => tu.id),
                  },
                },
              },
            ]
          : undefined,
      fields:
        type.typeKind === TypeKind.InterfaceType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.fields.map((f) => f.type.id),
                  },
                },
              },
            ]
          : undefined,
    },
    delete: {
      allowedValues:
        type.typeKind === TypeKind.EnumType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.allowedValues.map((av) => av.id),
                  },
                },
              },
            ]
          : undefined,
    },
  }
}
