'use server'

import { getEnv } from '@codelab/shared-config-env'
import { fetchWithAuth } from '@codelab/shared-infra-fetch-server'

import { revalidateComponentListOperation } from '../component-list'

export const importComponentDataUseCase = async (data: FormData) => {
  await fetchWithAuth(getEnv().endpoint.component.import, {
    body: data,
    method: 'POST',
  })
  await revalidateComponentListOperation()
}
