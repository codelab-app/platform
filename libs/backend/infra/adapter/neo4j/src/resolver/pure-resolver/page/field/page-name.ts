import { PageProperties } from '@codelab/shared/domain'
import type { Page } from '@codelab/shared/infra/gql'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const pageName: IFieldResolver<Page, unknown> =
  PageProperties.pageNameFromCompositeKey
