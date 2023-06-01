import { getEnv } from '@codelab/shared/config'

/**
 * https://vercel.com/docs/rest-api#endpoints/domains/get-a-domain-s-configuration
 *
 * @param name
 */
export const getDomainConfig = (name: string) => {
  const { domainApiUrl, getBaseHeaders, teamIdParam } = getEnv().vercel
  const url = `${domainApiUrl()}/${name}/config?${teamIdParam}`

  return fetch(url, {
    headers: getBaseHeaders(),
    method: 'GET',
  })
}
