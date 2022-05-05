import { MutationUpsertFieldArgs } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { getDriver, InterfaceTypeOGM } from '../../infra'
import connectField from '../../repositories/type/field/connectField.cypher'
import { interfaceTypeSelectionSet } from '../../selectionSets'

export const upsertField: IFieldResolver<
  any,
  any,
  MutationUpsertFieldArgs
> = async (parent, args) => {
  const session = getDriver().session()
  const InterfaceType = await InterfaceTypeOGM()

  try {
    await session.writeTransaction((tx) => tx.run(connectField, args))

    const [interfaceType] = await InterfaceType.find({
      selectionSet: interfaceTypeSelectionSet,
      where: {
        id: args.interfaceTypeId,
      },
    })

    return {
      __resolveType: ITypeKind.InterfaceType,
      ...interfaceType,
      fieldsConnection: {
        edges: interfaceType.fieldsConnection.edges.map((edge) => ({
          ...edge,
          node: {
            __resolveType: edge.node.kind,
            ...edge.node,
          },
        })),
      },
    }
  } finally {
    await session.close()
  }
}
