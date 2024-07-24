'use server'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type {
  PageDeleteInput,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import { Page } from '../store'
import { pageApi } from './page.api'

export const deletePageRepository = (
  $where: PageWhere,
  $delete: PageDeleteInput = Page.toDeleteInput(),
) => pageApi.DeletePages({ delete: $delete, where: $where })
