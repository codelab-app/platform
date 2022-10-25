import { isCi, isProduction } from './flags'

const graphqlApiHost =
  isProduction && isCi
    ? `https://${process.env['NEXT_PUBLIC_VERCEL_URL']}`
    : `http://${process.env['NEXT_PUBLIC_BUILDER_HOST']}`

export const graphqlApiOrigin = `${graphqlApiHost}/api/graphql`
