import { auth0ServerInstance } from '@codelab/shared-infra-auth0/server'
import Button from 'antd/lib/button'
import Link from 'next/link'
import React from 'react'

const HomeView = async () => {
  const session = await auth0ServerInstance.getSession()
  const user = session?.user

  return (
    <div>
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
      {user ? (
        <Button href="/api/auth/logout" id="logout" type="primary">
          Log Out
        </Button>
      ) : (
        <Button
          data-testid="auth0-login-link"
          href="/api/auth/login"
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
