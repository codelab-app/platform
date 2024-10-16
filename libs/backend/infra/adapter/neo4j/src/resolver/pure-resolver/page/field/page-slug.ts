import type { Page } from '@codelab/shared/infra/gql'
import type { IFieldResolver } from '@graphql-tools/utils'

import { PageProperties } from '@codelab/shared/domain-old'

/**
 * Takes the name and slugify it
 */
export const pageSlug: IFieldResolver<Page, unknown> = (page) => {
  return PageProperties.pageSlugFromCompositeKey(page)
}
