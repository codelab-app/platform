import { baseHeaders, projectApiUrl, teamIdParam } from '../config'

export const deleteDomain = (name: string) => {
  return fetch(`${projectApiUrl()}/domains/${name}?${teamIdParam}`, {
    method: 'DELETE',
    headers: baseHeaders,
  })
}
