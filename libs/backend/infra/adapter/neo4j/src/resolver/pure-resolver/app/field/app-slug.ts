import type { App } from '@codelab/shared/abstract/codegen'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { slugify } from '@codelab/shared/utils'
import type { IFieldResolver } from '@graphql-tools/utils'
import { appName } from './app-name'

/**
 * Takes the name and slugify it
 */
export const appSlug: IFieldResolver<App, unknown> =
  AppProperties.appSlugFromCompositeKey
