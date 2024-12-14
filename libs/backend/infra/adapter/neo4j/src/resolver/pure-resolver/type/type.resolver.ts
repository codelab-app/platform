import type { AnyType, IBaseType } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { getTypeDescendants } from '../../../cypher'
import { Neo4jService } from '../../../infra'

export const TYPE_RESOLVER_PROVIDER = 'TYPE_RESOLVER_PROVIDER'

export const TypeResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jService],
  provide: TYPE_RESOLVER_PROVIDER,
  useFactory: async (neo4jService: Neo4jService) => {
    // const baseTypes: IFieldResolver<
    //   GraphQLRequestContext,
    //   unknown,
    //   QueryBaseTypesArgs
    // > = (_, params) =>
    //   neo4jService.withReadTransaction(async (txn) => {
    //     const { options } = params
    //     const limit = options?.limit ?? 99999
    //     const skip = options?.offset ?? 0
    //     const name = options?.where?.name ?? ''

    //     const { records: getTypesRecords } = await txn.run(getBaseTypes, {
    //       limit: int(limit),
    //       name,
    //       skip: int(skip),
    //     })

    //     const totalCountRecord = getTypesRecords[0]?.get('totalCount')

    //     const totalCount = totalCountRecord
    //       ? int(totalCountRecord).toNumber()
    //       : 0

    //     const items = getTypesRecords.map((record) => {
    //       const type = record.get('type').properties
    //       // const owner = record.get('owner').properties

    //       return {
    //         ...type,
    //         __typename: 'BaseType',
    //         // owner,
    //       }
    //     })

    //     return {
    //       items,
    //       totalCount,
    //     }
    //   })

    const descendantTypesIds = (node: IBaseType) => {
      return neo4jService.withReadTransaction(async (txn) => {
        const { records } = await txn.run(getTypeDescendants, {
          this: node.id,
        })

        return records[0]?.get(0) ?? []
      })
    }

    return {
      AnyType: {
        __resolveType: (type: AnyType) => type.kind,
      },
      ArrayType: {
        descendantTypesIds,
      },
      IBaseType: {
        __resolveType: (type: IBaseType) => type.kind,
      },
      InterfaceType: {
        descendantTypesIds,
      },
      UnionType: {
        descendantTypesIds,
      },
    }
  },
}
