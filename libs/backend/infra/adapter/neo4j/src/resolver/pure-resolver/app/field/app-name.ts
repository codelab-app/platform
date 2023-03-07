import type { App } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * `_compoundName` contains format `userId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const name: IFieldResolver<App, unknown> = (app) => {
  return app._compoundName.replace(`${app.owner.auth0Id}-`, '')
}
