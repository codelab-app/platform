import { baseHeaders, domainApiUrl, teamIdParam } from '../const'

export const getConfig = (name: string) => {
  const url = `${domainApiUrl()}/${name}/config${teamIdParam}`

  return fetch(url, {
    method: 'GET',
    headers: baseHeaders,
  })
}
