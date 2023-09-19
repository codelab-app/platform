import type {
  IBaseType,
  QueryBaseTypesArgs,
} from '@codelab/shared/abstract/codegen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'
import { int } from 'neo4j-driver'
import { getBaseTypes } from '../../../cypher'
import type { Neo4jService } from '../../../infra'

export const TYPE_RESOLVER_PROVIDER = 'TYPE_RESOLVER_PROVIDER'

export const TypeResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown, QueryBaseTypesArgs>>
> = {
  provide: TYPE_RESOLVER_PROVIDER,
  useFactory: async (neo4jService: Neo4jService) => {
    const baseTypes: IFieldResolver<
      GraphQLRequestContext,
      unknown,
      QueryBaseTypesArgs
    > = (_, params) =>
      neo4jService.withReadTransaction(async (txn) => {
        const { options } = params
        const limit = options?.limit ?? 99999
        const skip = options?.offset ?? 0
        const name = options?.where?.name ?? ''

        const { records: getTypesRecords } = await txn.run(getBaseTypes, {
          limit: int(limit),
          name,
          skip: int(skip),
        })

        const totalCountRecord = getTypesRecords[0]?.get('totalCount')

        const totalCount = totalCountRecord
          ? int(totalCountRecord).toNumber()
          : 0

        const items = getTypesRecords.map((record) => {
          const type = record.get('type').properties
          const owner = record.get('owner').properties

          return {
            ...type,
            __typename: 'BaseType',
            owner,
          }
        })

        return {
          items,
          totalCount,
        }
      })

    return {
      IBaseType: {
        __resolveType: (type: IBaseType) => type.kind,
      },
      Query: {
        baseTypes: baseTypes,
      },
    }
  },
}
