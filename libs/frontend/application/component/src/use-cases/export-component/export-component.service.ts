'use server'

import { getEnv } from '@codelab/shared-config-env'
import { serverFetchWithAuth } from '@codelab/shared-infra-fetch-server'

export const exportComponentService = async (id: string) => {
  const response = await serverFetchWithAuth(
    `${getEnv().endpoint.component.export}?id=${id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )

  return await response.json()
}
