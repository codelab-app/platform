'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { invalidateAppListQuery } from '../app-list'

export const importAppUseCase = async (appData: FormData) => {
  const response = await fetchWithAuth('app/import', {
    body: appData,
    method: 'POST',
  })

  const data = await response.json()

  await invalidateAppListQuery()

  return data
}
