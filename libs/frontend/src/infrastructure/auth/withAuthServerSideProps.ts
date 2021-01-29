import * as cookie from 'cookie'
import { mergeDeep } from 'immutable'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { UnwrapPromise } from 'next/dist/lib/coalesced-function'
import { ssrGetMe } from '../../../../../apps/web/src/apollo/apollo-page.generated'
import { AUTH_TOKEN_COOKIE } from './authTokenStorage'

/** Queries the backend (getMe query) and returns the response parsed for returning in a getServerSideProps schema */
const getAuthResult = async (context: GetServerSidePropsContext<any>) => {
  // The API server doesn't use cookies for auth. But cookies are the only way to be able to store the auth token so that we can read it in SSR context
  // Therefore here we must check if we have a cookie with the auth token and transfer it to the Authorization header, which the API server actually reads

  // Extract the auth token from the cookie if we have one.
  // From there the authLink will read it and put it in the authorization header.
  const cookieHeader = context.req?.headers?.cookie
  let authToken: string | undefined

  // Parse the cookie header into simple key value pairs. Get the value mapped by the auth token key
  if (cookieHeader) authToken = cookie.parse(cookieHeader)[AUTH_TOKEN_COOKIE]

  // If we don't have a token in the cookie, no point in querying the server at all. Return an empty response
  if (!cookieHeader) {
    return {
      props: {
        apolloState: null,
        data: {
          getMe: null,
        },
        error: null,
      },
    }
  }

  try {
    /** Pass the authToken to the request context. The @see {@link authLink} will read the token from context and transfer it to the Authorization header */
    return await ssrGetMe.getServerPage(
      {
        context: {
          authToken,
        },
      },
      {},
    )
  } catch (e) {
    // If we don't catch here, it all blows in the SSR stage and the page doesn't get rendered.
    // Just return an empty response with an error if we catch something
    return {
      props: {
        apolloState: null,
        data: {
          getMe: null,
        },
        error: JSON.stringify(e),
      },
    }
  }
}

export type AuthServerSideResult = UnwrapPromise<
  ReturnType<typeof getAuthResult>
>

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
    user: AuthServerSideResult['props']['data']['getMe'],
  ) =>
    | Promise<GetServerSidePropsResult<any> | undefined>
    | GetServerSidePropsResult<any>
    | undefined,
) => async (context: GetServerSidePropsContext<any>) => {
  const result = await getAuthResult(context)

  if (getServerSidePropsFunc) {
    const originalData = await getServerSidePropsFunc(
      context,
      result?.props?.data?.getMe,
    )

    if (originalData) return mergeDeep(result, originalData)
  }

  return result
}

/** Shorthand for using @see {@link withAuthServerSideProps} for redirecting if not authenticated */
export const withAuthGuardServerSideProps = (redirect: {
  permanent: boolean
  destination: string
}) => {
  return withAuthServerSideProps((context, user) => {
    // if (!user) {
    //   return {
    //     redirect,
    //   }
    // }

    return undefined
  })
}
