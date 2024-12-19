import type { Page } from '@codelab/shared/infra/gql'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import {
  ElementDescendantsService,
  ElementRepository,
} from '@codelab/backend/domain/element'
import { Neo4jService } from '@codelab/backend-infra-adapter/neo4j-driver'

import { pageName } from './field/page-name'
import { pageSlug } from './field/page-slug'

export const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER'

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [ElementDescendantsService],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (elementDescendantsService: ElementDescendantsService) => {
    return {
      Mutation: {},
      Page: {
        elements: (node: Page) => {
          return elementDescendantsService.getDescendants(node.rootElement)
        },
        name: pageName,
        slug: pageSlug,
      },
      Query: {},
    }
  },
}
