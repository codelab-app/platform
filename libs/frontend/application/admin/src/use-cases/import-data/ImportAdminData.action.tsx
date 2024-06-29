'use server'

import { restApiClient } from '@codelab/frontend-infra-axios'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'

export const importAdminDataAction = async () => {
  const session = await auth0ServerInstance.getSession()

  await restApiClient.post('admin/import', '{}', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'X-ID-TOKEN': session?.idToken ?? '',
    },
  })
}
