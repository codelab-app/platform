import type { IInterfaceTypeDto, ITypeRef } from '@codelab/shared/abstract/core'
import type {
  UnionTypeTypesOfUnionTypeCreateInput,
  UnionTypeTypesOfUnionTypeUpdateInput,
} from '@codelab/shared/infra/gql'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { titleCase } from '@codelab/shared/utils'

export const interfaceTypeDtoFactory = (
  dto: Pick<IInterfaceTypeDto, 'id' | 'name' | 'owner'>,
) =>
  ({
    ...dto,
    __typename: ITypeKind.InterfaceType,
    kind: ITypeKind.InterfaceType,
  } as const)

export const connectTypesOfUnionType = (typeRefs?: Array<ITypeRef>) => {
  return typeRefs?.reduce<UnionTypeTypesOfUnionTypeCreateInput>(
    (acc, typeRef) => ({
      ...acc,
      [typeRef.__typename]: {
        connect: [
          ...(acc[typeRef.__typename]?.connect ?? []),
          { where: { node: { id: typeRef.id } } },
        ],
      },
    }),
    {},
  )
}

export const disconnectTypesOfUnionType = (typeRefs?: Array<ITypeRef>) => {
  return typeRefs?.reduce<UnionTypeTypesOfUnionTypeUpdateInput>(
    (acc, typeRef) => {
      const existingDisconnects = acc[typeRef.__typename] || []

      return {
        ...acc,
        [typeRef.__typename]: [
          {
            disconnect: [
              ...(existingDisconnects[0]?.disconnect || []),
              { where: { node: { id: typeRef.id } } },
            ],
          },
        ],
      }
    },
    {},
  )
}

export const reconnectTypesOfUnionType = (typeRefs?: Array<ITypeRef>) => {
  return Object.values(ITypeKind).reduce<UnionTypeTypesOfUnionTypeUpdateInput>(
    (acc, kind) => ({
      ...acc,
      [kind]: [
        {
          connect: typeRefs
            ?.filter((type) => type.__typename === kind)
            .map((type) => ({
              where: { node: { id: type.id } },
            })),
          disconnect: [
            {
              where: {
                node: {
                  NOT: {
                    id_IN: typeRefs?.map(({ id }) => id),
                  },
                },
              },
            },
          ],
        },
      ],
    }),
    {},
  )
}

export const getApiName = (name: string) => {
  return `${name} API`
}

export const getInterfaceName = (type: string) => `${titleCase(type)} API`

// export const makeFieldsCreateInput = (type: ICreateTypeDTO) => {
//   return {
//     connect: type.fields.map((f) => ({
//       where: { node: { id: f.type.id } },
//       edge: { name: f.name, description: f.description, key: f.key },
//     })),
//   }
// }
