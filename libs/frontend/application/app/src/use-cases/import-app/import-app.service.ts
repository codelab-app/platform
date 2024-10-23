'use server'

import { invalidateAppListQuery } from '@codelab/frontend-domain-app/repositories'
import { getEnv } from '@codelab/shared/config'
import { fetchWithAuth } from '@codelab/shared/infra/fetch'

export const importAppService = async (formData: FormData) => {
  const response = await fetchWithAuth(getEnv().endpoint.app.import, {
    body: formData,
    headers: { ContentType: 'multipart/form-data' },
    method: 'POST',
  })

  const data = await response.json()

  await invalidateAppListQuery()

  return data
}
