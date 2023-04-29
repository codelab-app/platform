import { isVercelPreview } from '../flags'

// for preview builds should use NEXT_PUBLIC_VERCEL_URL
// (which is https://builder-*-codelab.vercel.app)
// for local, CI and production should use NEXT_PUBLIC_PLATFORM_HOST
// (which is http://127.0.0.1:3000 or https://admin.codelab.app)
const graphqlApiHost = isVercelPreview
  ? process.env['NEXT_PUBLIC_VERCEL_URL']
  : process.env['NEXT_PUBLIC_PLATFORM_HOST']

const isDev = graphqlApiHost?.startsWith('127.0.0.1')
const protocol = isDev ? 'http' : 'https'

export const graphqlApiOrigin = `${protocol}://${graphqlApiHost}/api/graphql`
