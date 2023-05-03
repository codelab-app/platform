import { EnvPlatform, EnvPublic } from '@codelab/shared/config'

export const apiUrl = 'https://api.vercel.com'

export const baseHeaders = {
  Authorization: `Bearer ${EnvPlatform().vercel.vercel_api_token}`,
  'Content-Type': 'application/json',
}

export const projectApiUrl = (apiVer = '9') =>
  `${apiUrl}/v${apiVer}/projects/${EnvPublic().vercel.vercel_project_id}`

export const domainApiUrl = (apiVer = '6') => `${apiUrl}/v${apiVer}/domains`

export const teamIdParam = `teamId=${EnvPublic().vercel.vercel_team_id}`
