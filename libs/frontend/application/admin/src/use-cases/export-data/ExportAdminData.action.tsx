'use server'

import { getAuthenticatedApiClient } from '@codelab/frontend-infra-axios'
import type { IExportDto } from '@codelab/shared/abstract/core'

export const exportAdminDataAction = async (data: IExportDto) => {
  const apiClient = await getAuthenticatedApiClient()

  await apiClient.post('admin/export', data)
}
