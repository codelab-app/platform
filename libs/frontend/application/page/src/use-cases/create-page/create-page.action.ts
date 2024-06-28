'use server'

import {
  CACHE_TAGS,
  type ICreatePageData,
} from '@codelab/frontend/abstract/domain'
import { execute } from '@codelab/frontend/infra/gql'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { revalidateTag } from 'next/cache'
import { CreatePagesMutation } from './create-page.mutation'
import { toPageCreateInput } from './to-page-create.input'

export const createPageAction = async (data: ICreatePageData) => {
  const owner = await getServerUser()

  await execute(CreatePagesMutation, {
    input: [toPageCreateInput(data, owner)],
  })

  revalidateTag(CACHE_TAGS.PAGE_LIST)
}
