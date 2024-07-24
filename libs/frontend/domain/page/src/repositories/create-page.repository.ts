'use server'

import type {
  IPageModel,
  IPageRepository,
} from '@codelab/frontend/abstract/domain'
import { graphql, type PageCreateInput } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { pageApi } from './page.api'

export const createPageRepository: IPageRepository['add'] = async (
  page: IPageModel,
) => {
  const pages = await pageApi.CreatePages({ input: page.toCreateInput() })

  return pages.createPages.pages[0]
}
