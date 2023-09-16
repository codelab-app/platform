import type { Page } from '@codelab/shared/abstract/codegen'
import { PageProperties } from '@codelab/shared/domain/mapper'
import { slugify } from '@codelab/shared/utils'
import type { IFieldResolver } from '@graphql-tools/utils'
import { pageName } from './page-name'

/**
 * Takes the name and slugify it
 */
export const pageSlug: IFieldResolver<Page, unknown> = (page) => {
  return PageProperties.pageSlugFromCompositeKey(page)
}
