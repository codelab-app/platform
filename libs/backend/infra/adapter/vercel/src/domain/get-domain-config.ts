import { getEnv } from '@codelab/shared/config'

/**
 * https://vercel.com/docs/rest-api#endpoints/domains/get-a-domain-s-configuration
 *
 * @param name
 */
export const getDomainConfig = (name: string) => {
  const { vercel } = getEnv()
  const url = `${vercel.domainApiUrl()}/${name}/config?${vercel.teamIdParam}`

  return fetch(url, {
    headers: vercel.getBaseHeaders(),
    method: 'GET',
  })
}
