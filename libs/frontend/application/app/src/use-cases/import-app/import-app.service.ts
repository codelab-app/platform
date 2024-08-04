'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { invalidateAppListQuery } from '../app-list'

export const importAppService = async (appData: File) => {
  const formData = new FormData()

  formData.append('file', appData)

  const response = await fetchWithAuth('app/import', {
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
  })

  const data = await response.json()

  await invalidateAppListQuery()

  return data
}
