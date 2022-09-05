import { baseHeaders, projectApiUrl, teamIdParam } from '../config'

export const updateDomain = (oldName: string, newName: string) => {
  return fetch(`${projectApiUrl()}/domains/${oldName}${teamIdParam}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: newName }),
    headers: baseHeaders,
  })
}
