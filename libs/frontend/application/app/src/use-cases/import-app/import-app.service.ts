'use server'

import { invalidateAppListQuery } from '@codelab/frontend-domain-app/repositories'
import { getEnv } from '@codelab/shared/config/env'
import { serverFetchWithAuth } from '@codelab/shared/infra/fetch-server'

export const importAppService = async (formData: FormData) => {
  const response = await serverFetchWithAuth(getEnv().endpoint.app.import, {
    body: formData,
    headers: { ContentType: 'multipart/form-data' },
    method: 'POST',
  })

  const data = await response.json()

  await invalidateAppListQuery()

  return data
}
