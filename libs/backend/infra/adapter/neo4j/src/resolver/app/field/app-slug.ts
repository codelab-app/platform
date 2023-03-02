import type { App } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import slugify from 'voca/slugify'
import { name } from './app-name'

/**
 * Takes the name and slugify it
 */
export const slug: IFieldResolver<
  Pick<App, 'id' | '_compoundName'>,
  unknown
> = (source, args, context, info) => {
  // Only need source, but pass rest in to satisfy resolver interface
  return slugify(name(source, args, context, info))
}
