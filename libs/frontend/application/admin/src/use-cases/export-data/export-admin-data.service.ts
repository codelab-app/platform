import type { IExportDto } from '@codelab/shared-abstract-core'

import { jobSubscription } from '@codelab/frontend-infra-ws'
import { getEnv } from '@codelab/shared-config-env'

import { queueAdminDataExportAction } from './queue-admin-data-export.action'

export const exportAdminDataService = async (exportDto: IExportDto) => {
  const jobId = await queueAdminDataExportAction(exportDto)

  const { data } = await jobSubscription<{ data: string }>(jobId, {
    socketEndpoint: `${getEnv().endpoint.apiHost}`,
  })

  // if "Download" option was not selected during export - server does not return json body
  return data
}
