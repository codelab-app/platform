import { getSession } from '@auth0/nextjs-auth0'
import { Maybe } from '@codelab/shared/abstract/types'
import { GraphQLClient } from 'graphql-request'
import { RequestInit } from 'graphql-request/dist/types.dom'
import { GetServerSidePropsContext } from 'next'
import { API_ENV, GraphqlOperationOptions } from './GraphqlOperationOptions'

const apiUrlsByEnv: Record<API_ENV, string> = {
  [API_ENV.local]: `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`,
  // production: `${process.env.NEXT_PUBLIC_PRODUCTION_API_ORIGIN}/api/graphql`,
}

let localGraphqlClient: Maybe<GraphQLClient>

/**
 * Help extract JWT access token from SSR session and set authorization header on our client
 *
 * @param context GetServerSidePropsContext
 */
export const setClientAuthHeaders = async (
  context: GetServerSidePropsContext,
  options?: GraphQLClientOptions,
) => {
  const session = await getSession(context.req, context.res)

  getGraphQLClient(options).setHeaders({
    authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
  })

  return session
}

export type GraphQLClientOptions = RequestInit & GraphqlOperationOptions

export const getGraphQLClient = (options?: Maybe<GraphQLClientOptions>) => {
  /**
   * Default to local
   */
  // const env = options?.context?.env ?? API_ENV.local
  const apiUrl = apiUrlsByEnv[API_ENV.local]

  return (localGraphqlClient ??= new GraphQLClient(apiUrl, options))
}
