import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { NetworkErrorBoundary } from 'rest-hooks'

export const withSuspense = (Component: React.FC<any>) => ({
  ...props
}: any) => {
  return (
    <Suspense fallback={<Spin />}>
      <NetworkErrorBoundary>
        <Component {...props} />
      </NetworkErrorBoundary>
    </Suspense>
  )
}
