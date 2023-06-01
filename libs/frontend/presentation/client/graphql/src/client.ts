import { Env } from '@codelab/shared/config'
import { GraphQLClient } from 'graphql-request'

export const isVercelPreview =
  process.env['VERCEL_ENV'] === 'preview' ||
  process.env['NEXT_PUBLIC_VERCEL_ENV'] === 'preview'

const graphqlApiHost = isVercelPreview
  ? process.env['NEXT_PUBLIC_VERCEL_URL']
  : process.env['NEXT_PUBLIC_PLATFORM_HOST']

const isDev = graphqlApiHost?.startsWith('127.0.0.1')
const protocol = isDev ? 'http' : 'https'

export const graphqlApiOrigin = `${protocol}://${graphqlApiHost}/api/graphql`

/**
 * Issue with loading order when used by sdk
 */
// export const client = new GraphQLClient(Env.graphql.graphqlApiOrigin)
export const client = new GraphQLClient(graphqlApiOrigin)
