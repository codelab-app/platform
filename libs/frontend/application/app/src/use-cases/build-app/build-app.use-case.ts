'use server'

import { fetchWithAuth } from '@codelab/frontend-infra-fetch'

// makes a call to the api backend where request
// will be redirected to appropriate user domain
export const buildAppUseCase = async (pages: Array<string>, domain: string) => {
  const pagesParam = pages.join(',')

  const response = await fetchWithAuth(
    `regenerate?domain=${domain}&pages=${pagesParam}`,
    {
      method: 'GET',
    },
  )

  return await response.json()
}
