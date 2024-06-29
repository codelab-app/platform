'use server'

import { restApiClient } from '@codelab/frontend-infra-axios'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'

export const resetDatabaseAction = async () => {
  const session = await auth0ServerInstance.getSession()

  await restApiClient.post('admin/reset-database', '{}', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'X-ID-TOKEN': session?.idToken ?? '',
    },
  })
}

export const resetDatabaseExceptUserAction = async () => {
  const session = await auth0ServerInstance.getSession()

  await restApiClient.post('admin/reset-database-except-user', '{}', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'X-ID-TOKEN': session?.idToken ?? '',
    },
  })
}
