'use server'

import {
  CACHE_TAGS,
  type ICreateAppData,
} from '@codelab/frontend/abstract/domain'
import { execute } from '@codelab/frontend/infra/gql'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { AppProperties, connectOwner } from '@codelab/shared/domain'
import { revalidateTag } from 'next/cache'
import { CreateAppsMutation } from './create-app.mutation'

export const createAppAction = async ({ id, name }: ICreateAppData) => {
  const owner = await getServerUser()

  await execute(CreateAppsMutation, {
    input: {
      compositeKey: AppProperties.appCompositeKey(name, owner),
      id,
      owner: connectOwner(owner),
    },
  })

  revalidateTag(CACHE_TAGS.APP_LIST)
}
