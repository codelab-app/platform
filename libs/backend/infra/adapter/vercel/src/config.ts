import { Env } from '@codelab/shared/config'

export const apiUrl = 'https://api.vercel.com'

export const getBaseHeaders = () => ({
  Authorization: `Bearer ${Env.vercel.vercelAccessToken}`,
  'Content-Type': 'application/json',
})

export const projectApiUrl = (apiVer = '9') =>
  `${apiUrl}/v${apiVer}/projects/${Env.vercel.vercelProjectId}`

export const domainApiUrl = (apiVer = '6') => `${apiUrl}/v${apiVer}/domains`

export const teamIdParam = `teamId=${Env.vercel.vercelTeamId}`
