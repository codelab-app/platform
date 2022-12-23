import { isCircleCi, isProduction, isVercel } from './flags'

const graphqlApiHost =
  isProduction && isVercel && !isCircleCi
    ? process.env['NEXT_PUBLIC_VERCEL_URL']
    : process.env['NEXT_PUBLIC_BUILDER_HOST']

const isDev = graphqlApiHost?.startsWith('127.0.0.1')
const protocol = isDev ? 'http' : 'https'

export const graphqlApiOrigin = `${protocol}://${graphqlApiHost}/api/graphql`
