import type { Tag, TagFragment } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'
import type { Node } from 'neo4j-driver'

import { Neo4jService } from '@codelab/backend-infra-adapter/neo4j-driver'

import { getTagWithDescendantsById } from '../../cypher'

export const TAG_RESOLVER_PROVIDER = 'TAG_RESOLVER_PROVIDER'

export const descendants =
  (neo4jService: Neo4jService) =>
  ({ id }: Tag) => {
    return neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run<TagFragment>(
        getTagWithDescendantsById,
        {
          rootId: id,
        },
      )

      const nodes = records[0]?.get(0) || []

      return nodes.map((node: Node) => node.properties)
    })
  }

export const TagResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jService],
  provide: TAG_RESOLVER_PROVIDER,
  useFactory: async (neo4jService: Neo4jService) => {
    return {
      Mutation: {},
      Query: {},
      Tag: {
        descendants: descendants(neo4jService),
      },
    }
  },
}
