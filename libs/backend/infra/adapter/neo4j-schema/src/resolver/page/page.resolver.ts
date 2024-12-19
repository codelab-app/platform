import type { Page } from '@codelab/shared/infra/gql'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { ElementDescendantsService } from '@codelab/backend/domain/element'

import { pageName } from './field/page-name'
import { pageSlug } from './field/page-slug'

export const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER'

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [ElementDescendantsService],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (elementDescendantsService: ElementDescendantsService) => {
    const elements: IFieldResolver<Page, unknown> = (parent) =>
      elementDescendantsService.getDescendants(parent.rootElement)

    return {
      Mutation: {},
      Page: {
        elements,
        name: pageName,
        slug: pageSlug,
      },
      Query: {},
    }
  },
}
