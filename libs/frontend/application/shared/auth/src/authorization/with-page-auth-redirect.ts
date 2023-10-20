import { auth0Instance, checkExpiry } from '@codelab/shared/infra/auth0'

export const withPageAuthRedirect = () =>
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

      return {
        props: {},
      }
    },
  })
