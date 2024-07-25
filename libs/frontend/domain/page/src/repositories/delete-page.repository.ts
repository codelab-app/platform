'use server'

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
