import { auth0Instance, checkExpiry } from '@codelab/shared/infra/auth0'

const getPerformanceLogger = () => {
  let now = Date.now()

  return (message: string) => {
    console.log(message, Date.now() - now)
    now = Date.now()
  }
}

export const withPageAuthRedirect = () => {
  const log = getPerformanceLogger()

  log('withPageAuthRedirect start')

  const auth0 = auth0Instance()

  log('withPageAuthRedirect -> auth0')

  const getServerSideProps = auth0.withPageAuthRequired({
    // This function will run if the user is authenticated.
    getServerSideProps: async (ctx) => {
      const log2 = getPerformanceLogger()

      log2('withPageAuthRedirect -> getServerSideProps')

      const session = await auth0Instance().getSession(ctx.req, ctx.res)

      log2('withPageAuthRedirect -> getServerSideProps -> session')

      const expired = checkExpiry(session)

      log2('withPageAuthRedirect -> getServerSideProps -> expired')

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

  log('withPageAuthRedirect end')

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return async (...args) => {
    const log3 = getPerformanceLogger()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await getServerSideProps(...args)

    log3('executing getServerSideProps')

    return result
  }
}
