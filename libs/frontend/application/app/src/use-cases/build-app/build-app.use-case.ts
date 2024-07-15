'use server'
import { getEnv } from '@codelab/shared/config'

// makes a call to the api backend where session is checked
// and request will be redirected to appropriate user domain
export const buildAppUseCase = async (pages: Array<string>, domain: string) => {
  const baseUrl = getEnv().endpoint.webHost
  const pagesParam = pages.join(',')
  const protocol = baseUrl.startsWith('http') ? '' : 'https://'

  const response = await fetch(
    `${protocol}${baseUrl}/api/regenerate?domain=${domain}&pages=${pagesParam}`,
  )

  if (response.ok) {
    return response.json()
  }

  const error = await response.text()

  throw new Error(error)
}
