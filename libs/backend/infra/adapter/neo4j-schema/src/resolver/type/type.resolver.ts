import type { AnyType, IBaseType } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import {
  getTypeDescendants,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'

export const TYPE_RESOLVER_PROVIDER = 'TYPE_RESOLVER_PROVIDER'

export const TypeResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jService],
  provide: TYPE_RESOLVER_PROVIDER,
  useFactory: async (neo4jService: Neo4jService) => {
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
