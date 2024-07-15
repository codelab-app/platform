'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const exportComponentUseCase = async (id: string) => {
  const response = await fetchWithAuth(`component/export?id=${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })

  return await response.json()
}
