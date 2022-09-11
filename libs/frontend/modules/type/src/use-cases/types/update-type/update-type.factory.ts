import {
  ITypeKind,
  IUpdateTypeArgs,
  IUpdateTypeDTO,
} from '@codelab/shared/abstract/core'
import {
  makeAllowedValuesCreateInput,
  makeArrayTypeDisconnectInput,
  makeItemTypeCreateInput,
  makeTypesOfUnionTypeCreateInput,
  makeTypesOfUnionTypeDisconnectInput,
} from '@codelab/shared/data'

export const updateTypeInputFactory = (
  type: IUpdateTypeDTO,
): IUpdateTypeArgs => {
  // For some reason if the disconnect and delete are in the update section it throws an error
  return {
    update: {
      name: type.name,
      primitiveKind:
        type.kind === ITypeKind.PrimitiveType ? type.primitiveKind : undefined,
      language:
        type.kind === ITypeKind.CodeMirrorType ? type.language : undefined,
      elementKind:
        type.kind === ITypeKind.ElementType ? type.elementKind : undefined,
      itemType:
        type.kind === ITypeKind.ArrayType
          ? makeItemTypeCreateInput(type)
          : undefined,
      owner:
        type.kind === ITypeKind.InterfaceType
          ? {
              connect: {
                where: { node: { auth0Id: type.interfaceDefaults?.auth0Id } },
                edge: {
                  data: JSON.stringify(type.interfaceDefaults?.data || '{}'),
                },
              },
            }
          : undefined,
      typesOfUnionType:
        type.kind === ITypeKind.UnionType
          ? makeTypesOfUnionTypeCreateInput(type)
          : undefined,

      allowedValues:
        type.kind === ITypeKind.EnumType
          ? [makeAllowedValuesCreateInput(type)]
          : undefined,
      owner: {
        connect: {
          where: { node: { auth0Id: type.interfaceDefaults?.auth0Id } },
          edge: {
            data: JSON.stringify(type.interfaceDefaults?.data),
          },
        },
      },
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
    delete: {
      allowedValues:
        type.kind === ITypeKind.EnumType
          ? [
              {
                where: {
                  node: {
                    id_NOT_IN: type.allowedValues?.map((av) => av.id),
                  },
                },
              },
            ]
          : undefined,
    },
  }
}
