'use server'

import { getEnv } from '@codelab/shared/config'
import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import axios from 'axios'

export const getAuthenticatedApiClient = async () => {
  const session = await auth0ServerInstance.getSession()

  return axios.create({
    baseURL: new URL('api', getEnv().endpoint.apiHost).toString(),
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
      'X-ID-TOKEN': session?.idToken ?? '',
    },
  })
}
