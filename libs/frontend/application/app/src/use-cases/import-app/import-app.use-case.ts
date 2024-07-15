'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { refreshAppListAction } from '../app-list/app-list.repository'

export const importAppUseCase = async (appData: FormData) => {
  const response = await fetchWithAuth('app/import', {
    body: appData,
    method: 'POST',
  })

  const data = await response.json()

  await refreshAppListAction()

  return data
}
