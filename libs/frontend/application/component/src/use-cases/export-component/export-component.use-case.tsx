'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'

export const exportComponentUseCase = async (id: string) => {
  const apiClient = await getAuthenticatedApiClient()
  const response = await apiClient.get(`component/export?id=${id}`)

  return response.data
}
