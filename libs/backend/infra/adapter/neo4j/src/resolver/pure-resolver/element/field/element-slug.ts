import type { Element } from '@codelab/shared/abstract/codegen'
import { slugify } from '@codelab/shared/utils'
import type { IFieldResolver } from '@graphql-tools/utils'
import { name } from './element-name'

/**
 * Takes the name and slugify it
 */
export const slug: IFieldResolver<Element, unknown> = (
  element,
  args,
  context,
  info,
) => {
  // Only need source, but pass rest in to satisfy resolver interface
  return slugify(name(element, args, context, info))
}
