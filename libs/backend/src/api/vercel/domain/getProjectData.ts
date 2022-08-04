import fetch from 'cross-fetch'
import { baseHeaders, projectApiUrl, teamIdParam } from '../const'

export const getProjectData = (name: string) => {
  const url = `${projectApiUrl()}/domains/${name}${teamIdParam}`

  return fetch(url, {
    method: 'GET',
    headers: baseHeaders,
  })
}
