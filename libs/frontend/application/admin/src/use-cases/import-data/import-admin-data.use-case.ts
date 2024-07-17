'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const importAdminDataUseCase = () =>
  fetchWithAuth('admin/import', {
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
