'use server'

import type { IExportDto } from '@codelab/shared/abstract/core'

import { getEnv } from '@codelab/shared/config/env'
import { fetchWithAuth } from '@codelab/shared/infra/fetch'

export const exportAdminDataService = async (dto: IExportDto) => {
  const response = await fetchWithAuth(getEnv().endpoint.admin.export, {
    body: JSON.stringify(dto),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return response.json()
}
