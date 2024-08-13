'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const exportComponentService = async (id: string) => {
  const response = await fetchWithAuth(
    `${getEnv().endpoint.component.export}?id=${id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )

  return await response.json()
}
