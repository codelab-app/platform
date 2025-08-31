import type {
  BaseTypeFragment,
  IBaseType,
  TypeFragment,
} from '@codelab/shared-infra-gqlgen'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/legacy/helpers/types'

import {
  getTypeDescendants,
  Neo4jService,
} from '@codelab/backend-infra-adapter-neo4j-driver'

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
      }, 'GetTypeDescendants')
    }

    /**
     * Don't rely on __typename to resolve
     */
    return {
      AllType: {
        __resolveType: (type: Partial<TypeFragment>) => {
          if (!type.__typename && !type.kind) {
            throw new Error(
              'Either __typename or kind is required for resolving AllType',
            )
          }

          return type.__typename ?? type.kind
        },
      },
      ArrayType: {
        descendantTypesIds,
      },
      IBaseType: {
        __resolveType: (type: Partial<BaseTypeFragment>) => {
          if (!type.__typename && !type.kind) {
            throw new Error(
              'Either __typename or kind is required for resolving IBaseType',
            )
          }

          return type.__typename ?? type.kind
        },
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
