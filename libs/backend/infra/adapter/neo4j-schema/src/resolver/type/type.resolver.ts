import type { AnyType, IBaseType } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import {
  getTypeDescendants,
  Neo4jDriverService,
} from '@codelab/backend-infra-adapter/neo4j-driver'

export const TYPE_RESOLVER_PROVIDER = 'TYPE_RESOLVER_PROVIDER'

export const TypeResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jDriverService],
  provide: TYPE_RESOLVER_PROVIDER,
  useFactory: async (neo4jDriverService: Neo4jDriverService) => {
    const descendantTypesIds = (node: IBaseType) => {
      return neo4jDriverService.withReadTransaction(async (txn) => {
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
