import type { Page, TypeFragment } from '@codelab/shared/infra/gqlgen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import type { GraphQLRequestContext } from 'graphql-request/build/legacy/helpers/types'

import { ElementDependantTypesService } from '@codelab/backend/domain/element'
import { PageElementsService } from '@codelab/backend/domain/page'
import { PageProperties } from '@codelab/shared-domain-module/page'

export const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER'

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<GraphQLRequestContext, unknown>>
> = {
  inject: [PageElementsService, ElementDependantTypesService],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (
    pageElementsService: PageElementsService,
    elementDependantTypesService: ElementDependantTypesService,
  ) => {
    const elements: IFieldResolver<Page, unknown> = (page) =>
      pageElementsService.getElements(page)

    const dependantTypes: IFieldResolver<
      Page,
      unknown,
      unknown,
      Promise<Array<TypeFragment>>
    > = (page) =>
      elementDependantTypesService.getDependantTypes(page.rootElement)

    return {
      Mutation: {},
      Page: {
        dependantTypes,
        elements,
        /**
         * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
         *
         * We can compute name by replacing the ID
         */
        name: (page: Page) => {
          return PageProperties.pageNameFromCompositeKey(page)
        },
        /**
         * Takes the name and slugify it
         */
        slug: (page: Page) => {
          return PageProperties.pageSlugFromCompositeKey(page)
        },
      },
      Query: {},
    }
  },
}
