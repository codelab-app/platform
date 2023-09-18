import type { Element } from '@codelab/shared/abstract/codegen'
import { ElementProperties } from '@codelab/shared/domain/mapper'
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
) => ElementProperties.elementSlugFromCompositeKey(element)
