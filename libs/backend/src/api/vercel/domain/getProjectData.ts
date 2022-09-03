import fetch from 'cross-fetch'
import { baseHeaders, projectApiUrl, teamIdParam } from '../const'

export const PROJECT_NOT_FOUND = 404

/**
 * https://vercel.com/docs/rest-api#endpoints/projects/get-a-project-domain
 *
 * 400 - One of the provided values in the request query is invalid.
 * 404 - Project not found
 */
export const getProjectData = (name: string) => {
  const url = `${projectApiUrl()}/domains/${name}${teamIdParam}`

  return fetch(url, {
    method: 'GET',
    headers: baseHeaders,
  })
}
