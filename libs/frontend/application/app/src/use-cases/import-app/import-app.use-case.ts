'use server'

import { refreshAppListAction } from '@codelab/frontend-domain-app/actions'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const importAppUseCase = async (appData: FormData) => {
  const response = await fetchWithAuth('app/import', {
    body: appData,
    method: 'POST',
  })

  const data = await response.json()

  await refreshAppListAction()

  return data
}
