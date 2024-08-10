import { AppProperties } from '@codelab/shared/domain'
import type { App } from '@codelab/shared/infra/gql'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const appName: IFieldResolver<App, unknown> =
  AppProperties.appNameFromCompositeKey
