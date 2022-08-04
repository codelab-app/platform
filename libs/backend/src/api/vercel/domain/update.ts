import { baseHeaders, projectApiUrl, teamIdParam } from '../const'

export const update = (oldName: string, newName: string) => {
  return fetch(`${projectApiUrl()}/domains/${oldName}${teamIdParam}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: newName }),
    headers: baseHeaders,
  })
}
