// import { getSession } from '@auth0/nextjs-auth0'
import { GraphQLClient } from 'graphql-request'
import { GetServerSidePropsContext } from 'next'

const endpoint = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`

export const client = new GraphQLClient(endpoint)

/**
 * Help extract JWT access token from SSR session and set authorization header on our client
 *
 * @param context GetServerSidePropsContext
 */
export const setClientAuthHeaders = async (
  context: GetServerSidePropsContext,
) => {
  // const session = await getSession(context.req, context.res)

  // client.setHeaders({
  //   authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
  // })

  // return session

  return {}
}
