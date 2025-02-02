'use server'

import { getEnv } from '@codelab/shared/config/env'
import { serverFetchWithAuth } from '@codelab/shared/infra/fetch-server'

export const resetDatabaseService = async () => {
  const response = await serverFetchWithAuth(
    getEnv().endpoint.admin.resetDatabase,
    {
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    },
  )

  const { data } = await response.json()

  return data
}
