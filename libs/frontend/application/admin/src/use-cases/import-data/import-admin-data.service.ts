'use server'

import { getEnv } from '@codelab/shared-config-env'
import { serverFetchWithAuth } from '@codelab/shared-infra-fetch-server'

export const importAdminDataService = async () => {
  const result = await serverFetchWithAuth(getEnv().endpoint.admin.import, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return await result.text()
}
