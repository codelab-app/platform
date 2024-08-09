import type { Element } from '@codelab/shared/infra/gql'
import { ElementProperties } from '@codelab/shared/domain'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * Takes the name and slugify it
 */
export const slug: IFieldResolver<Element, unknown> = (
  element,
  args,
  context,
  info,
) => ElementProperties.elementSlugFromCompositeKey(element)
