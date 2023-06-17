import { getEnv } from '@codelab/shared/config'

export const addDomain = (name: string) => {
  const { vercel } = getEnv()
  const url = `${vercel.projectApiUrl()}/domains?${vercel.teamIdParam}`

  return fetch(url, {
    body: JSON.stringify({
      method: 'add',
      name,
    }),
    headers: vercel.getBaseHeaders(),
    method: 'POST',
  })
}
