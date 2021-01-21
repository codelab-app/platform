import ParseCookies from 'cookie'
import { mergeDeep } from 'immutable'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { UnwrapPromise } from 'next/dist/lib/coalesced-function'
import { ssrGetMe } from '../../../../../apps/web/src/apollo/apollo-page.generated'
import { AUTH_TOKEN_COOKIE } from '@codelab/frontend'

const getAuthResult = async (cookie: string | undefined) => {
  if (cookie) {
    const cookies = ParseCookies.parse(cookie)
    const token = cookies ? cookies[AUTH_TOKEN_COOKIE] : undefined

    try {
      return await ssrGetMe.getServerPage({}, undefined, token)
    } catch (e) {
      return {
        props: {
          apolloState: null,
          data: null,
          error: e,
        },
      }
    }
  }

  return {
    props: {
      apolloState: null,
      data: null,
      error: null,
    },
  }
}

export type AuthServerSideResult = UnwrapPromise<
  ReturnType<typeof getAuthResult>
>

export const withAuthServerSideProps = (
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext,
    intermediateResult: AuthServerSideResult,
  ) => Promise<GetServerSidePropsResult<any>>,
) => async (context: GetServerSidePropsContext<any>) => {
  const cookie = context.req?.headers?.cookie

  const result = await getAuthResult(cookie)

  if (getServerSidePropsFunc) {
    const originalData = await getServerSidePropsFunc(context, result)

    return mergeDeep(result, originalData)
  }

  return result
}

export const withAuthGuardServerSideProps = (redirectTo = '/') => {
  return withAuthServerSideProps(async (context, intermediateProps) => {
    if (!intermediateProps.props.data?.getMe) {
      return {
        redirect: {
          destination: redirectTo,
          permanent: false,
        },
      }
    }

    return intermediateProps
  })
}
