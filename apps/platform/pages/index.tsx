import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { context, trace } from '@opentelemetry/api'
import { setSpan } from '@opentelemetry/api/build/src/trace/context-utils'
import Link from 'next/link'
import React, { useEffect } from 'react'

const HomePage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <div>
      <Link href="http://127.0.0.1:16686" target="_blank">
        Jaeger
      </Link>
      <Link href="http://127.0.0.1:9090/targets" target="_blank">
        Prometheus
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
