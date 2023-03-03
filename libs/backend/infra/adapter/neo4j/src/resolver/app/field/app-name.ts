import type { App } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
export const name: IFieldResolver<
  Pick<App, 'id' | '_compoundName'>,
  unknown
> = (props) => {
  return props._compoundName.replace(`${props.id}-`, '')
}
