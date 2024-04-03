import { useUser } from '@auth0/nextjs-auth0/client'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

type HomeView = CodelabPage<DashboardTemplateProps>

const HomeView: HomeView = () => {
  const { user } = useUser()

  return (
    <div>
      <Link href="http://127.0.0.1:16686" target="_blank">
        Jaeger
      </Link>
      {/* <Link href="http://127.0.0.1:9090/targets" target="_blank">
        Prometheus
      </Link> */}
      {user ? (
        <Link href="/api/auth/logout">
          <Button id="logout" type="primary">
            Log Out
          </Button>
        </Link>
      ) : (
        <Link href="/api/auth/login">
          <Button id="login" type="primary">
            Log In
          </Button>
        </Link>
      )}
    </div>
  )
}

/**
 * Need this file for Cypress `readywhen` to see if server is running
 */
export default HomeView

const HomeViewLayout: HomeView['Layout'] = ({ children }) => {
  return <>{children()}</>
}

HomeView.Layout = HomeViewLayout
