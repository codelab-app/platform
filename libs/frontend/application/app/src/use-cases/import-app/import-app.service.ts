'use server'

import { getEnv } from '@codelab/shared/config/env'
import { serverFetchWithAuth } from '@codelab/shared/infra/fetch-server'

export const queueImportAppAction = async (formData: FormData) => {
  const response = await serverFetchWithAuth(getEnv().endpoint.app.import, {
    body: formData,
    headers: { ContentType: 'multipart/form-data' },
    method: 'POST',
  })

  return response.json()
}
