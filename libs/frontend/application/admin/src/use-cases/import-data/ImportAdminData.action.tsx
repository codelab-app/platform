'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'

export const importAdminDataAction = async () => {
  const apiClient = await getAuthenticatedApiClient()

  await apiClient.post('admin/import', '{}')
}
