'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'
import type { IAppAggregate } from '@codelab/shared/abstract/core'

export const exportAppUseCase = async (id: string) => {
  const apiClient = await getAuthenticatedApiClient()
  const res = await apiClient.get<IAppAggregate>(`app/export?id=${id}`)

  return res.data
}
