import { getMaybeServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import Button from 'antd/lib/button'
import Link from 'next/link'

import { Subscriptions } from './components/subscriptions'

const HomeView = async () => {
  const maybeUser = await getMaybeServerUser()

  /**
   * This is called on server side, useful for getting tokens for playground testing
   */
  // console.log('accessToken', session?.accessToken)
  // console.log('idToken', session?.user.idToken)

  return (
    <div>
      <Subscriptions />
      <button role="button">Click</button>

      <div role="dialog">
        <button role="button">Submit</button>
      </div>

      <Link
        data-testid="jaeger-link"
        href="http://127.0.0.1:16686"
        target="_blank"
      >
        Jaegers
      </Link>
      {/* <Link href="http://127.0.0.1:9090/targets" target="_blank">
        Prometheus
      </Link> */}
      {/* Must use normal link since Next.js Link will send a cors request for prefetching */}
      {maybeUser ? (
        <Button href="/auth/logout" id="logout" type="primary">
          Log Out
        </Button>
      ) : (
        <Button
          data-testid="auth0-login-link"
          href="/auth/login"
          id="login"
          type="primary"
        >
          Log In
        </Button>
      )}
    </div>
  )
}

export default HomeView
