'use server'

import type { IExportDto } from '@codelab/shared/abstract/core'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

export const exportAdminDataUseCase = async (dto: IExportDto) => {
  const response = await fetchWithAuth(getEnv().endpoint.admin.export, {
    body: JSON.stringify(dto),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return response.json()
}
