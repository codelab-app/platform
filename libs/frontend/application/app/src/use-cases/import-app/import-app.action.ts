'use server'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { refreshAppListAction } from '@codelab/frontend-domain-app/actions'
import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'

export const importAppAction = async (appData: string) => {
  const apiClient = await getAuthenticatedApiClient()
  const { data } = await apiClient.post<IAppModel>('/app/import', appData)

  await refreshAppListAction()

  return data
}
