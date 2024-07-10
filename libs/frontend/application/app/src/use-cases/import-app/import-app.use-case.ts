'use server'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'
import { invalidateAppListQuery } from '../app-list'

export const importAppUseCase = async (appData: string) => {
  const apiClient = await getAuthenticatedApiClient()
  const { data } = await apiClient.post<IAppModel>('/app/import', appData)

  await invalidateAppListQuery()

  return data
}
