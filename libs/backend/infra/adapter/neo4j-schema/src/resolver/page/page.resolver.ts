import type { GqlContext } from '@codelab/backend-abstract-types'
import type { Page, TypeFragment } from '@codelab/shared-infra-gqlgen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'

import { PageElementsService } from '@codelab/backend-domain-page'
import { PageProperties } from '@codelab/shared-domain-module-page'

export const PAGE_RESOLVER_PROVIDER = 'PAGE_RESOLVER_PROVIDER'

export const PageResolverProvider: FactoryProvider<
  Promise<IResolvers<GqlContext, unknown>>
> = {
  inject: [PageElementsService],
  provide: PAGE_RESOLVER_PROVIDER,
  useFactory: async (pageElementsService: PageElementsService) => {
    const elements: IFieldResolver<Page, GqlContext> = (page) =>
      pageElementsService.getElements(page)

    const dependantTypes: IFieldResolver<
      Page,
      GqlContext,
      unknown,
      Promise<Array<TypeFragment>>
    > = (page, _args, context) => {
      return context.loaders.elementDependantTypesLoader.load(
        page.rootElement.id,
      )
    }

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
