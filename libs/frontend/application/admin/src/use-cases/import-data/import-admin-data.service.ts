import type { IImportDto } from '@codelab/shared/abstract/core'

import { jobSubscription } from '@codelab/frontend/infra/ws'
import { getEnv } from '@codelab/shared/config/env'

import { queueAdminDataImportAction } from './queue-admin-data-import.action'

export const importAdminDataService = async (data?: IImportDto) => {
  const jobId = await queueAdminDataImportAction(data)

  return await jobSubscription(jobId, {
    socketEndpoint: `${getEnv().endpoint.apiHost}`,
    timeoutMs: 120_000,
  })
}
