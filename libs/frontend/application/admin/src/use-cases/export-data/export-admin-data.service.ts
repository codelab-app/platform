'use server'

import type { IExportDto } from '@codelab/shared/abstract/core'

import { getEnv } from '@codelab/shared/config/env'
import { serverFetchWithAuth } from '@codelab/shared/infra/fetch-server'

export const exportAdminDataService = async ({ adminDataPath }: IExportDto) => {
  const response = await serverFetchWithAuth(getEnv().endpoint.admin.export, {
    body: JSON.stringify({ adminDataPath }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return response.json()
}
