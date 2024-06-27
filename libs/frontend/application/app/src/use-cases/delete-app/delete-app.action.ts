'use server'

import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { execute } from '@codelab/frontend/infra/gql'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { revalidateTag } from 'next/cache'
import { DeleteAppsMutation } from './delete-app.mutation'

export const deleteAppAction = async (app: IAppDto) => {
  await execute(DeleteAppsMutation, {
    delete: { pages: [{ where: {} }] },
    where: { id: app.id },
  })

  revalidateTag(CACHE_TAGS.APP_LIST)
}
