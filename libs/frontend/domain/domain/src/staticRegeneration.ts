import { isVercelPreview } from '@codelab/shared/config'

const baseUrl = isVercelPreview
  ? process.env['NEXT_PUBLIC_VERCEL_URL']
  : process.env['NEXT_PUBLIC_BUILDER_HOST']

const isDev = baseUrl?.startsWith('127.0.0.1')
const protocol = isDev ? 'http' : 'https'

export const regenerateAppPages = (appId: string) => {
  return fetch(`${protocol}://${baseUrl}/api/regenerate?appId=${appId}`)
}

export const regeneratePages = (pageId: string) => {
  return fetch(`${protocol}://${baseUrl}/api/regenerate?pageId=${pageId}`)
}

export const regenerateAllPages = () => {
  return fetch(`${protocol}://${baseUrl}/api/regenerate`)
}
