'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import type { IExportDto } from '@codelab/shared/abstract/core'

export const exportAdminUseCase = async (dto: IExportDto) => {
  const response = await fetchWithAuth('admin/export', {
    body: JSON.stringify(dto),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const { data } = await response.json()

  return data
}
