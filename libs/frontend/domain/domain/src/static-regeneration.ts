// makes a call to the builder backend where session is checked

import { getEnv } from '@codelab/shared/config'

// and request will be redirected to appropriate user domain
export const regeneratePages = (pages: Array<string>, domain: string) => {
  const baseUrl = getEnv().graphql.nextPublicPlatformHost
  const pagesParam = pages.join(',')

  return fetch(
    `https://${baseUrl}/api/regenerate?domain=${domain}&pages=${pagesParam}`,
  )
}
