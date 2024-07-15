'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import type { IRef } from '@codelab/shared/abstract/core'

export const exportAppUseCase = async (app: IRef) => {
  const response = await fetchWithAuth(`app/export?id=${app.id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })

  return await response.json()
}
