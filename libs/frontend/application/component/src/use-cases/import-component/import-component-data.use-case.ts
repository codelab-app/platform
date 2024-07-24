'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'
import { revalidateComponentListOperation } from '../component-list'

export const importComponentDataUseCase = async (data: FormData) => {
  await fetchWithAuth('component/import', { body: data, method: 'POST' })
  await revalidateComponentListOperation()
}
