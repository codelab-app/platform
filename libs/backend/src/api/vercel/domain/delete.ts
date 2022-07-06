import { baseHeaders, projectApiUrl, teamIdParam } from '../../const'

export const deleteDomain = (name: string) => {
  return fetch(`${projectApiUrl()}/domains/${name}${teamIdParam}`, {
    method: 'DELETE',
    headers: baseHeaders,
  })
}
