import { EnvPublic } from '@codelab/shared/infra/config'

export const apiUrl = 'https://api.vercel.com'

export const projectApiUrl = (apiVer = '9') =>
  `${apiUrl}/v${apiVer}/projects/${EnvPublic().vercel.vercel_project_id}`

export const domainApiUrl = (apiVer = '6') => `${apiUrl}/v${apiVer}/domains`

export const teamIdParam = EnvPublic().vercel.vercel_team_id
