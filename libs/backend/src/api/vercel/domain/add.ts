import { baseHeaders, projectApiUrl, teamIdParam } from '../../const'

export const add = (name: string) => {
  const url = `${projectApiUrl()}/domains${teamIdParam}`

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      method: 'add',
      name,
    }),
    headers: baseHeaders,
  })
}
