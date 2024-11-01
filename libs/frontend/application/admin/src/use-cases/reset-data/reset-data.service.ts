'use server'

import { getEnv } from '@codelab/shared/config'
import { fetchWithAuth } from '@codelab/shared/infra/fetch'

export const resetDatabaseService = async () => {
  const response = await fetchWithAuth(getEnv().endpoint.admin.resetDatabase, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const { data } = await response.json()

  return data
}
