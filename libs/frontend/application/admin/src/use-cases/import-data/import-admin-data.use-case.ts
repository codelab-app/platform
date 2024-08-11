'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const importAdminDataUseCase = async () => {
  const result = await fetchWithAuth(getEnv().endpoint.admin.import, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return await result.text()
}
