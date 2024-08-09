import { ElementProperties } from '@codelab/shared/domain'
import type { Element } from '@codelab/shared/infra/gql'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const name: IFieldResolver<Element, unknown> =
  ElementProperties.elementNameFromCompositeKey
