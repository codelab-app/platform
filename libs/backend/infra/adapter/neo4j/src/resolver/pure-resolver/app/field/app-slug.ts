import type { App } from '@codelab/shared/abstract/codegen'
import { slugify } from '@codelab/shared/utils'
import type { IFieldResolver } from '@graphql-tools/utils'
import { name } from './app-name'

/**
 * Takes the name and slugify it
 */
export const slug: IFieldResolver<App, unknown> = (
  app,
  args,
  context,
  info,
) => {
  // Only need source, but pass rest in to satisfy resolver interface
  return slugify(name(app, args, context, info))
}
