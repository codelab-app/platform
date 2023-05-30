import { Env } from '@codelab/shared/config'

const baseUrl = Env.graphql.nextPublicPlatformHost

// makes a call to the builder backend where session is checked
// and request will be redirected to appropriate user domain
export const regeneratePages = (pages: Array<string>, domain: string) => {
  const pagesParam = pages.join(',')

  return fetch(
    `https://${baseUrl}/api/regenerate?domain=${domain}&pages=${pagesParam}`,
  )
}
