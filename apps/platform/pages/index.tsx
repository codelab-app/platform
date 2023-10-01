import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const HomePage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <div>
      {/* <Link href="http://127.0.0.1:16686" target="_blank">
        Jaeger
      </Link>
      <Link href="http://127.0.0.1:9090/targets" target="_blank">
        Prometheus
      </Link> */}
      <Link href="/apps">
        <Button type="primary">Log In</Button>
      </Link>
    </div>
  )
}

/**
 * Need this file for Cypress `readywhen` to see if server is running
 */
export default HomePage

HomePage.Layout = ({ children }) => {
  return <>{children()}</>
}
