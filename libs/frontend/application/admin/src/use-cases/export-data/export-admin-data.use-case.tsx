'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'
import type { IExportDto } from '@codelab/shared/abstract/core'

export const exportAdminDataUseCase = async (data: IExportDto) => {
  const apiClient = await getAuthenticatedApiClient()
  const response = await apiClient.post('admin/export', data)

  return response.data
}
