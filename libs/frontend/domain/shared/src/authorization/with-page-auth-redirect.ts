import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { checkExpiry } from '@codelab/shared/infra/auth0'

export const withPageAuthRedirect = () =>
  withPageAuthRequired({
    // This function will run if the user is authenticated.
    getServerSideProps: async (ctx) => {
      const session = await getSession(ctx.req, ctx.res)
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

      return {
        props: {},
      }
    },
  })
