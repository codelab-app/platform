'use server'

import { getEnv } from '@codelab/shared/config/env'
import { fetchWithAuth } from '@codelab/shared/infra/fetch'

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
