'use server'

import type { IAppService } from '@codelab/frontend/abstract/application'
import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { invalidateAppListQuery } from '../app-list'

export const importAppUseCase: IAppService['importApp'] = async (
  appData: FormData,
) => {
  const response = await fetchWithAuth('app/import', {
    body: appData,
    method: 'POST',
  })

  const data = await response.json()

  await invalidateAppListQuery()

  return data
}
