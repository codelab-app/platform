import type { Element } from '@codelab/shared/abstract/codegen'
import { uuidRegex } from '@codelab/shared/utils'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const name: IFieldResolver<Element, unknown> = (element) => {
  const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

  return element._compositeKey.replace(reg, '')
}
