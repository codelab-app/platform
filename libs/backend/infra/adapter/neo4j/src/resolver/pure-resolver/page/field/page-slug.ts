import type { Page } from '@codelab/shared/abstract/codegen'
import { slugify } from '@codelab/shared/utils'
import type { IFieldResolver } from '@graphql-tools/utils'
import { name } from './page-name'

/**
 * Takes the name and slugify it
 */
export const slug: IFieldResolver<Page, unknown> = (
  page,
  args,
  context,
  info,
) => {
  // Only need source, but pass rest in to satisfy resolver interface
  return slugify(name(page, args, context, info))
}
