import type { Page } from '@codelab/shared/abstract/codegen'
import type { IRef } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface PageData {
  app: { id: never }
  compositeKey: never
}

export class PageProperties {
  static pageCompositeKey = (pageName: string, app: IRef) => {
    return `${app.id}-${pageName}`
  }

  static pageNameFromCompositeKey = (page: DeepPick<Page, PageData>) =>
    page.compositeKey.replace(`${page.app.id}-`, '')

  static pageSlugFromCompositeKey = (page: DeepPick<Page, PageData>) => {
    return slugify(PageProperties.pageNameFromCompositeKey(page))
  }
}
