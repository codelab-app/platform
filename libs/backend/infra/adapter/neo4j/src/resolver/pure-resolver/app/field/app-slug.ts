import { AppProperties } from '@codelab/shared/domain'
import type { App } from '@codelab/shared/infra/gql'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * Takes the name and slugify it
 */
export const appSlug: IFieldResolver<App, unknown> =
  AppProperties.appSlugFromCompositeKey
