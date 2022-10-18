import { baseHeaders, projectApiUrl, teamIdParam } from '../config'

export const updateDomain = (name: string) => {
  const url = `${projectApiUrl()}/domains?${teamIdParam}`

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({
      method: 'patch',
      name,
    }),
    headers: baseHeaders,
  })
}
