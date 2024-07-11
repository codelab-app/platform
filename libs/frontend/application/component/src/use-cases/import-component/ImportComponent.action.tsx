'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'

export const importComponentDataAction = async (file: File) => {
  const apiClient = await getAuthenticatedApiClient()
  const response = await apiClient.post('component/import', data)

  return response.data
}
