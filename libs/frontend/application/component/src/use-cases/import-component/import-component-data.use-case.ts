'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { getEnv } from '@codelab/shared/config'

import { revalidateComponentListOperation } from '../component-list'

export const importComponentDataUseCase = async (data: FormData) => {
  await fetchWithAuth(getEnv().endpoint.component.import, {
    body: data,
    method: 'POST',
  })
  await revalidateComponentListOperation()
}
