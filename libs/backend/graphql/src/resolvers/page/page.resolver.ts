import type { Page } from '@codelab/shared/abstract/codegen'
import type { IResolvers } from '@graphql-tools/utils'
import slugify from 'voca/slugify'

/**
 * Takes the name and slugify it
 */
const slug = (props: Pick<Page, 'id' | '_compoundName'>) => {
  return slugify(name(props))
}

/**
 * `_compoundName` contains format `appId-name`, which allows page name to be unique across users.
 *
 * We can compute name by replacing the ID
 */
const name = (props: Pick<Page, 'id' | '_compoundName'>) => {
  return props._compoundName.replace(props.id, '')
}

export const pageResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Page: {
    slug,
    name,
  },
}
