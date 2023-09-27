import { auth0Instance } from '@codelab/frontend/infra/auth0'
import { checkExpiry } from '@codelab/shared/infra/auth0'
import { mergeProps } from '@codelab/shared/utils'
import { GetServerSideProps } from 'next'

export const withPageAuthRedirect = (callback?: GetServerSideProps) =>
  auth0Instance().withPageAuthRequired({
    // This function will run if the user is authenticated.
    getServerSideProps: async (ctx) => {
      const session = await auth0Instance().getSession(ctx.req, ctx.res)
      const expired = checkExpiry(session)

      if (session && expired) {
        return {
          props: {},
          redirect: {
            destination: '/api/auth/logout',
            statusCode: 307,
          },
        }
      }

      const fallback = { props: {} }

      if (!callback) {
        return fallback
      }

      return mergeProps(callback(ctx), fallback)
    },
  })
