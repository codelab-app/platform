import { getEnv } from '@codelab/shared/config'

export const addDomain = (name: string) => {
  const { getBaseHeaders, projectApiUrl, teamIdParam } = getEnv().vercel
  const url = `${projectApiUrl()}/domains?${teamIdParam}`

  return fetch(url, {
    body: JSON.stringify({
      method: 'add',
      name,
    }),
    headers: getBaseHeaders(),
    method: 'POST',
  })
}
