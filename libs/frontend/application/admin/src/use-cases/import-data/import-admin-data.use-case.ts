'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const importAdminDataUseCase = () =>
  fetchWithAuth(getEnv().endpoint.admin.import, {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
