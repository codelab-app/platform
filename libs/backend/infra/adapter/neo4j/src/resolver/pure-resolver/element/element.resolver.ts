import type { ContainerNode } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { getElementDescendants } from '../../../cypher'
import { Neo4jService } from '../../../infra'
import { name } from './field/element-name'
import { slug } from './field/element-slug'

export const ELEMENT_RESOLVER_PROVIDER = 'ELEMENT_RESOLVER_PROVIDER'

export const descendants =
  (neo4jService: Neo4jService) => (node: ContainerNode) => {
    return neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementDescendants, {
        this: node.id,
      })

      return records[0]?.get(0) ?? []
    })
  }

export const ElementResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jService],
  provide: ELEMENT_RESOLVER_PROVIDER,
  useFactory: async (neo4jService: Neo4jService) => {
    return {
      Element: {
        __typename: 'Element',
        // We only use the OGM resolver, but we set a dummy resolver here to hide the console errors
        dependantTypes: (node) => {
          console.warn(
            'Fetching dependant types field resolver, not yet implemented!',
            node,
          )

          return []
        },
        descendants: descendants(neo4jService),
        name,
        // renderType,
        slug,
      },
      ElementRenderType: {
        __resolveType: (node: ContainerNode) => {
          /**
           * `__resolveType` is there by default, for ones that don't exist, we have __typename
           */
          const resolveType =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node as any).__resolveType ?? (node as any).__typename

          if (!resolveType) {
            console.debug(node)

            throw new Error('Missing __resolveType')
          }

          return resolveType
        },
      },
      Mutation: {},
      Query: {},
    }
  },
}
