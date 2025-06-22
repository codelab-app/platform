'use server'

import type { IExportDto } from '@codelab/shared-abstract-core'

import { getEnv } from '@codelab/shared-config-env'
import { serverFetchWithAuth } from '@codelab/shared-infra-fetch-server'
import { v4 } from 'uuid'

export const queueAdminDataExportAction = async ({
  adminDataPath,
  download,
}: IExportDto) => {
  const response = await serverFetchWithAuth(getEnv().endpoint.admin.export, {
    body: JSON.stringify({ adminDataPath, download, jobId: v4() }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const { jobId } = await response.json()

  return jobId
}
