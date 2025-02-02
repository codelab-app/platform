import type { IPageDto, IRef } from '@codelab/shared/abstract/core'
import type { Page } from '@codelab/shared/infra/gqlgen'
import type { DeepPick } from 'ts-essentials'

import { slugify } from '@codelab/shared/utils'

interface PageData {
  app: { id: never }
  compositeKey: never
}

const pageCompositeKey = (page: Pick<IPageDto, 'name'>, app: IRef) => {
  return `${app.id}-${page.name}`
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
