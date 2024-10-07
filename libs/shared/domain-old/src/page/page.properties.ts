import type { IRef } from '@codelab/shared/abstract/core'
import type { Page } from '@codelab/shared/infra/gql'
import type { DeepPick } from 'ts-essentials'

import { slugify } from '@codelab/shared/utils'

interface PageData {
  app: { id: never }
  compositeKey: never
}

const pageCompositeKey = (pageName: string, app: IRef) => {
  return `${app.id}-${pageName}`
}

const pageNameFromCompositeKey = (page: DeepPick<Page, PageData>) =>
  page.compositeKey.replace(`${page.app.id}-`, '')

const pageSlugFromCompositeKey = (page: DeepPick<Page, PageData>) => {
  return slugify(PageProperties.pageNameFromCompositeKey(page))
}

export const PageProperties = {
  pageCompositeKey,
  pageNameFromCompositeKey,
  pageSlugFromCompositeKey,
}
