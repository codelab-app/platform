'use server'

import { invalidateAppListQuery } from '@codelab/frontend-domain-app/repositories'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const importAppService = async (appData: File) => {
  const formData = new FormData()

  formData.append('file', appData)

  const response = await fetchWithAuth(getEnv().endpoint.app.import, {
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
  })

  const data = await response.json()

  await invalidateAppListQuery()

  return data
}
