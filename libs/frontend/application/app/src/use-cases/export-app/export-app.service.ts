'use server'

import type { App } from '@codelab/frontend/infra/gql'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import type { IRef } from '@codelab/shared/abstract/core'
import { getEnv } from '@codelab/shared/config'

export const exportAppService = async (app: IRef) => {
  const response = await fetchWithAuth(
    `${getEnv().endpoint.app.export}?id=${app.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )

  const data: App = await response.json()

  return data
}
