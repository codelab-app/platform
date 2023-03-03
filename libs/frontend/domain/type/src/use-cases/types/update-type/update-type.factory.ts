import type {
  IUpdateTypeArgs,
  IUpdateTypeData,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  makeAllowedValuesCreateInput,
  makeArrayTypeDisconnectInput,
  makeItemTypeCreateInput,
  makeTypesOfUnionTypeCreateInput,
  makeTypesOfUnionTypeDisconnectInput,
} from '@codelab/shared/domain/mapper'

export const updateTypeInputFactory = (
  type: IUpdateTypeData,
): IUpdateTypeArgs => {
  // For some reason if the disconnect and delete are in the update section it throws an error
  return {
    delete: {
      allowedValues:
        type.kind === ITypeKind.EnumType
          ? [
              {
                where: {
                  node: {
                    NOT: {
                      id_IN: type.allowedValues?.map((av) => av.id),
                    },
                  },
                },
              },
            ]
          : undefined,
    },
    disconnect: {
      itemType:
        type.kind === ITypeKind.ArrayType && type.arrayTypeId
          ? makeArrayTypeDisconnectInput(type)
          : undefined,
      typesOfUnionType:
        type.kind === ITypeKind.UnionType
          ? makeTypesOfUnionTypeDisconnectInput(type)
          : undefined,
      // fields:
      //   type.kind === ITypeKind.InterfaceType
      //     ? [
      //         {
      //           where: {
      //             node: {
      //               id_NOT_IN: type.fields.map((f) => f.type.id),
      //             },
      //           },
      //         },
      //       ]
      //     : undefined,
    },
    update: {
      allowedValues:
        type.kind === ITypeKind.EnumType
          ? [makeAllowedValuesCreateInput(type)]
          : undefined,
      elementKind:
        type.kind === ITypeKind.ElementType ? type.elementKind : undefined,
      itemType:
        type.kind === ITypeKind.ArrayType
          ? makeItemTypeCreateInput(type)
          : undefined,
      language:
        type.kind === ITypeKind.CodeMirrorType ? type.language : undefined,
      name: type.name,
      primitiveKind:
        type.kind === ITypeKind.PrimitiveType ? type.primitiveKind : undefined,

      typesOfUnionType:
        type.kind === ITypeKind.UnionType
          ? makeTypesOfUnionTypeCreateInput(type)
          : undefined,
    },
  }
}
