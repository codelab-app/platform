import { baseHeaders, projectApiUrl, teamIdParam } from '../config'

export const addDomain = (name: string) => {
  const url = `${projectApiUrl()}/domains?${teamIdParam}`

  return fetch(url, {
    body: JSON.stringify({
      method: 'add',
      name,
    }),
    headers: baseHeaders,
    method: 'POST',
  })
}
