import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { NodeDetail } from '@codelab/ui/component'

const isServer = typeof window === 'undefined'

const NodeDetailWithSuspense = () => {
  return (
    <Suspense fallback={<Spin />}>
      {/* <NetworkErrorBoundary> */}
      <NodeDetail id="5f7dd77424295bacc7634469" />
      {/* </NetworkErrorBoundary> */}
    </Suspense>
  )
}

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  console.log('resource!')

  return <>{!isServer ? <NodeDetailWithSuspense /> : null}</>
}

export default Index
