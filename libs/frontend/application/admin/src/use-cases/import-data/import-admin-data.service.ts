'use server'

import { getEnv } from '@codelab/shared/config/env'
import { fetchWithAuth } from '@codelab/shared/infra/fetch'

export const importAdminDataService = async () => {
  const result = await fetchWithAuth(getEnv().endpoint.admin.import, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return await result.text()
}
