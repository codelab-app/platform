'use server'

import { invalidateAppListQuery } from '@codelab/frontend-domain-app/repositories'
import { fetchWithAuth } from '@codelab/shared/infra/fetch'
import { getEnv } from '@codelab/shared/config'

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
