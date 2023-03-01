import type { App } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import slugify from 'voca/slugify'

/**
 * Takes the name and slugify it
 */
const slug = (props: Pick<App, 'id' | '_compoundName'>) => {
  console.log(props)

  return slugify(name(props))
}

/**
 * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const name = (props: Pick<App, 'id' | '_compoundName'>) => {
  console.log(props)

  return props._compoundName.replace(`${props.id}-`, '')
}

export const appResolver: IResolvers = {
  App: {
    name,
    slug,
  },
}
