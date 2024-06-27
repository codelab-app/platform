'use server'

import {
  CACHE_TAGS,
  type ICreateAppData,
} from '@codelab/frontend/abstract/domain'
import { execute } from '@codelab/frontend/infra/gql'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { revalidateTag } from 'next/cache'
import { CreateAppsMutation } from './create-app.mutation'
import { toAppCreateInput } from './to-app-create.input'

export const createAppAction = async (data: ICreateAppData) => {
  const owner = await getServerUser()

  await execute(CreateAppsMutation, {
    input: [toAppCreateInput(data, owner)],
  })

  revalidateTag(CACHE_TAGS.APP_LIST)
}
