'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const resetDatabaseUseCase = async () => {
  const response = await fetchWithAuth(getEnv().endpoint.admin.resetDatabase, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const { data } = await response.json()

  return data
}
