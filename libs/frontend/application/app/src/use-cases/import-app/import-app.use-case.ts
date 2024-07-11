'use server'

import { refreshAppListAction } from '@codelab/frontend-domain-app/actions'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

export const importAppUseCase = async (appData: string) => {
  await fetchWithAuth('/app/import', {
    body: appData,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  await refreshAppListAction()
}
