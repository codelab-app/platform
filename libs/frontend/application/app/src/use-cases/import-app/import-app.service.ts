'use server'

import { getEnv } from '@codelab/shared-config-env'
import { fetchWithAuth } from '@codelab/shared-infra-fetch-server'

export const queueImportAppAction = async (formData: FormData) => {
  const response = await fetchWithAuth(getEnv().endpoint.app.import, {
    body: formData,
    headers: { ContentType: 'multipart/form-data' },
    method: 'POST',
  })

  return response.json()
}
