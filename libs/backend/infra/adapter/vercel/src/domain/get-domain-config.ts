import { domainApiUrl, getBaseHeaders, teamIdParam } from '../config'

/**
 * https://vercel.com/docs/rest-api#endpoints/domains/get-a-domain-s-configuration
 *
 * @param name
 */
export const getDomainConfig = (name: string) => {
  const url = `${domainApiUrl()}/${name}/config?${teamIdParam}`

  return fetch(url, {
    headers: getBaseHeaders(),
    method: 'GET',
  })
}
