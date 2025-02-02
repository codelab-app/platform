import type { App } from '@codelab/shared/infra/gqlgen'
import type { IFieldResolver, IResolvers } from '@graphql-tools/utils'

import { AppProperties } from '@codelab/shared-domain-module-app'

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const name: IFieldResolver<App, unknown> =
  AppProperties.appNameFromCompositeKey

/**
 * Takes the name and slugify it
 */
export const slug: IFieldResolver<App, unknown> =
  AppProperties.appSlugFromCompositeKey

export const appResolver: IResolvers = {
  App: {
    name,
    slug,
  },
}
