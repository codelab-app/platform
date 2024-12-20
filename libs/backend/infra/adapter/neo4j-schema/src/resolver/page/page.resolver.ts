import type { Page } from '@codelab/shared/infra/gql'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/cjs/types'

import { PageElementsService } from '@codelab/backend/domain/page'

import { pageName } from './field/page-name'
import { pageSlug } from './field/page-slug'

export const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER'

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [PageElementsService],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (pageElementsService: PageElementsService) => {
    const elements: IFieldResolver<Page, unknown> = (page) =>
      pageElementsService.getElements(page)

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
