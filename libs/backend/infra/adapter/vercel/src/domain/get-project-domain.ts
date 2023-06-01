import { getEnv } from '@codelab/shared/config'
import fetch from 'cross-fetch'

export const PROJECT_NOT_FOUND = 404

/**
 * https://vercel.com/docs/rest-api#endpoints/projects/get-a-project-domain
 *
 * 400 - One of the provided values in the request query is invalid.
 * 404 - Project not found
 */
export const getProjectDomain = (name: string) => {
  const { getBaseHeaders, projectApiUrl, teamIdParam } = getEnv().vercel
  const url = `${projectApiUrl()}/domains/${name}?${teamIdParam}`

  return fetch(url, {
    headers: getBaseHeaders(),
    method: 'GET',
  })
}
