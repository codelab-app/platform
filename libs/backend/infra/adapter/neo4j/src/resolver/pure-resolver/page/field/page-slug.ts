import type { Page } from '@codelab/shared/abstract/codegen'
import { PageProperties } from '@codelab/shared/domain/mapper'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * Takes the name and slugify it
 */
export const pageSlug: IFieldResolver<Page, unknown> = (page) => {
  return PageProperties.pageSlugFromCompositeKey(page)
}
