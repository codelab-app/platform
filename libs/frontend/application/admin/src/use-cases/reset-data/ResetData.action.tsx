'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'

export const resetDatabaseAction = async () => {
  const apiClient = await getAuthenticatedApiClient()

  await apiClient.post('admin/reset-database', '{}')
}

export const resetDatabaseExceptUserAction = async () => {
  const apiClient = await getAuthenticatedApiClient()

  await apiClient.post('admin/reset-database-except-user', '{}')
}
