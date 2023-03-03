import { baseHeaders, projectApiUrl, teamIdParam } from '../config'

export const deleteDomain = (name: string) => {
  return fetch(`${projectApiUrl()}/domains/${name}?${teamIdParam}`, {
    headers: baseHeaders,
    method: 'DELETE',
  })
}
