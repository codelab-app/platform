'use server'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'
import { refreshAppListAction } from '../app-list'

export const importAppAction = async (appData: string) => {
  const apiClient = await getAuthenticatedApiClient()
  const { data } = await apiClient.post<IAppModel>('/app/import', appData)

  await refreshAppListAction()

  return data
}
