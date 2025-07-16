'use server'

import type { IImportDto } from '@codelab/shared-abstract-core'

import { getEnv } from '@codelab/shared-config-env'
import { fetchWithAuth } from '@codelab/shared-infra-fetch-server'
import { v4 } from 'uuid'

export const queueAdminDataImportAction = async (data?: IImportDto) => {
  const result = await fetchWithAuth(getEnv().endpoint.admin.import, {
    body: JSON.stringify({ jobId: v4(), ...data }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const { jobId } = await result.json()

  return jobId
}
