import type { Page } from '@codelab/shared/infra/gql'
import { PageProperties } from '@codelab/shared/domain'
import type { IFieldResolver } from '@graphql-tools/utils'

/**
 * Takes the name and slugify it
 */
export const pageSlug: IFieldResolver<Page, unknown> = (page) => {
  return PageProperties.pageSlugFromCompositeKey(page)
}
