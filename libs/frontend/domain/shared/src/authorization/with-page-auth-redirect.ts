import { getPageServerSideProps } from '@codelab/frontend/domain/page'
import { auth0Instance } from '@codelab/frontend/infra/auth0'
import { checkExpiry } from '@codelab/shared/infra/auth0'

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

export const withPageAuthRedirectWithInternalAuth = () =>
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

      if (session?.user && ctx.params) {
        const appSlug = ctx.params.appSlug as string
        const pageSlug = ctx.params.pageSlug as string
        const user = { id: session.user.id }

        const page = await getPageServerSideProps(appSlug, pageSlug, user)
        const code = page?.getServerSideProps

        if (code) {
          try {
            return new Function(code)(ctx)
          } catch (e) {
            return { props: {} }
          }
        }
      }

      return {
        props: {},
      }
    },
  })
