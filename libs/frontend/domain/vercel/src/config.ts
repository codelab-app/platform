export const apiUrl = 'https://api.vercel.com'

export const projectApiUrl = (apiVer = '9') =>
  `${apiUrl}/v${apiVer}/projects/${process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID}`

export const domainApiUrl = (apiVer = '6') => `${apiUrl}/v${apiVer}/domains`

export const teamIdParam = process.env.NEXT_PUBLIC_VERCEL_TEAM_ID
