'use server'

import { restApiClient } from '@codelab/frontend-infra-axios'
import type { IExportDto } from '@codelab/shared/abstract/core'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'

export const exportAdminDataAction = async (data: IExportDto) => {
  const session = await auth0ServerInstance.getSession()

  await restApiClient.post('admin/export', data, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'X-ID-TOKEN': session?.idToken ?? '',
    },
  })
}
