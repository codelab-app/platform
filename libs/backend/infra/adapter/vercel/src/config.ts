export const apiUrl = 'https://api.vercel.com'

export const baseHeaders = {
  Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
  'Content-Type': 'application/json',
}

export const projectApiUrl = (apiVer = '9') =>
  `${apiUrl}/v${apiVer}/projects/${process.env.VERCEL_PROJECT_ID}`

export const domainApiUrl = (apiVer = '6') => `${apiUrl}/v${apiVer}/domains`

export const teamIdParam = `teamId=${process.env.VERCEL_TEAM_ID}`
