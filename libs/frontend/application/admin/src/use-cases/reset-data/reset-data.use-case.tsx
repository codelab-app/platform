'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const resetDatabaseUseCase = async () => {
  const response = await fetchWithAuth('admin/reset-database', {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const { data } = await response.json()

  return data
}
