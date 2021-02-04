import * as cookie from 'cookie'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { addApolloState, initializeApollo } from '../../model'
import { AUTH_TOKEN_COOKIE } from './authTokenStorage'
import { GetMeGql, GetMeQuery } from '@codelab/generated'

/** Queries the backend (getMe query) and returns the response parsed for returning in a getServerSideProps schema */
const extractAuthToken = (context: GetServerSidePropsContext) => {
  // Extract the auth token from the cookie if we have one.
  // From there the authLink will read it and put it in the authorization header.
  const cookieHeader = context.req?.headers?.cookie
  let authToken: string | undefined

  // Parse the cookie header into simple key value pairs. Get the value mapped by the auth token key
  if (cookieHeader) {
    authToken = cookie.parse(cookieHeader)[AUTH_TOKEN_COOKIE]
  }

  return authToken
}

/**
 * Wraps the getServerSideProps function and provides it the current logged in user as a parameter (if any, else - null)
 * Use it like this:
 * ```
 * export const getServerSideProps = withAuthServerSideProps(async (context, user) => {
 *      if (!user) {
 *        return {
 *          redirect: {
 *            destination: redirectTo,
 *            permanent: false,
 *          },
 *        }
 *      }
 *
 *      return undefined
 *    })
 * ```
 *  You can return some some props yourself in the callback, like a normal getServerSideProps function.
 *  They will get merged with the getMe data from the auth query.
 *  Or just return undefined, only the getMe result will be returned then
 * @param getServerSidePropsFunc
 */
export const withAuthServerSideProps = (
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext,
    user: GetMeQuery['getMe'] | undefined,
  ) =>
    | Promise<GetServerSidePropsResult<any> | undefined>
    | GetServerSidePropsResult<any>
    | undefined,
) => async (context: GetServerSidePropsContext<any>) => {
  // The API server doesn't use cookies for auth. But cookies are the only way to be able to store the auth token so that we can read it in SSR context
  // Therefore here we must check if we have a cookie with the auth token and transfer it to the Authorization header, which the API server actually reads
  const authToken = extractAuthToken(context)

  /** Pass the authToken to the request context. The @see {@link authLink}
   will read the token from context and transfer it to the Authorization header */
  const apolloClient = initializeApollo({ authToken })

  let result

  // If we don't have a token in the cookie, no point in querying the server at all. Return an empty response
  if (authToken) {
    result = await apolloClient.query({
      query: GetMeGql,
    })
  }

  let props: any = {}

  if (getServerSidePropsFunc) {
    props = await getServerSidePropsFunc(context, result?.data?.getMe)
  }

  return addApolloState(apolloClient, {
    props: props || {},
  })
}

/** Shorthand for using @see {@link withAuthServerSideProps} for redirecting if not authenticated */
export const withAuthGuardServerSideProps = (redirect: {
  permanent: boolean
  destination: string
}) => {
  return withAuthServerSideProps((context, user) => {
    if (!user) {
      return {
        redirect,
      }
    }

    return undefined
  })
}
