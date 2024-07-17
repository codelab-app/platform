'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const importComponentDataUseCase = async (data: FormData) => {
  const response = await fetchWithAuth('component/import', {
    body: data,
    method: 'POST',
  })

  return response.json()
}
