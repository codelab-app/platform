import type { Page } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { ElementRepository } from '@codelab/backend/domain/element'
import { Neo4jService } from '@codelab/backend-infra-adapter/neo4j-driver'

import { elementDescendants } from '../element'
import { pageName } from './field/page-name'
import { pageSlug } from './field/page-slug'

export const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER'

export const elements =
  (neo4jService: Neo4jService, elementRepository: ElementRepository) =>
  (node: Page) =>
    elementDescendants(neo4jService, elementRepository)(node.rootElement)

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [Neo4jService, ElementRepository],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (
    neo4jService: Neo4jService,
    elementRepository: ElementRepository,
  ) => {
    return {
      Mutation: {},
      Page: {
        elements: elements(neo4jService, elementRepository),
        name: pageName,
        slug: pageSlug,
      },
      Query: {},
    }
  },
}
