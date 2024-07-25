'use server'

import type {
  IPageModel,
  IPageRepository,
} from '@codelab/frontend/abstract/domain'
import { pageApi } from './page.api'

export const createPageRepository: IPageRepository['add'] = async (
  page: IPageModel,
) => {
  const pages = await pageApi.CreatePages({ input: page.toCreateInput() })

  return pages.createPages.pages[0]
}
