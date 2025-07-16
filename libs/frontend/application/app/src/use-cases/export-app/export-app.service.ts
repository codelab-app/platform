'use server'

import type { IRef } from '@codelab/shared-abstract-core'
import type { App } from '@codelab/shared-infra-gqlgen'

import { getEnv } from '@codelab/shared-config-env'
import { fetchWithAuth } from '@codelab/shared-infra-fetch-server'

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
