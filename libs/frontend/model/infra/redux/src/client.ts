import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Maybe } from '@codelab/shared/abstract/types'
import { GraphQLClient } from 'graphql-request'
import { RequestInit } from 'graphql-request/dist/types.dom'
import { GetServerSidePropsContext } from 'next'
import { API_ENV } from './GraphqlOperationOptions'

const apiUrlsByEnv: Record<API_ENV, string> = {
  local: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
  production: `${process.env.NEXT_PUBLIC_PRODUCTION_API_ORIGIN}/api/graphql`,
}

let localGraphqlClient: Maybe<GraphQLClient>
let productionGraphqlClient: Maybe<GraphQLClient>

/**
 * Help extract JWT access token from SSR session and set authorization header on our client
 *
 * @param context GetServerSidePropsContext
 */
export const setClientAuthHeaders = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context.req, context.res)

  getGraphQLClient({}).setHeaders({
    authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
  })
}

export const getGraphQLClient = ({
  env = API_ENV.local,
  ...options
}: Partial<RequestInit & { env: API_ENV }>) => {
  const apiUrl = apiUrlsByEnv[env]

  return env === API_ENV.production
    ? (productionGraphqlClient ??= new GraphQLClient(
        apiUrl,
        options ?? undefined,
      ))
    : (localGraphqlClient ??= new GraphQLClient(apiUrl, options ?? undefined))
}
