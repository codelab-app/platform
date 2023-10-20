import type { App } from '@codelab/shared/abstract/codegen'
import { AppProperties } from '@codelab/shared/domain/mapper'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * Takes the name and slugify it
 */
export const appSlug: IFieldResolver<App, unknown> =
  AppProperties.appSlugFromCompositeKey
