import React from 'react'
import {
  NodeDetail,
  NodeDetailData,
  NodeList,
  NodeListData,
} from '@codelab/ui/component'
import { withSuspense } from '@codelab/ui/hoc'

const isServer = typeof window === 'undefined'

const NodeDetailWithSuspense = withSuspense(() => (
  <NodeDetailData id="5f7dd77424295bacc7634469">
    {(resource) => <NodeDetail resource={resource} />}
  </NodeDetailData>
))

const NodeListWithSuspense = withSuspense(() => (
  <NodeListData>{(resource) => <NodeList resource={resource} />}</NodeListData>
))

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  console.log('resource!')

  return (
    <>
      {/* <>{!isServer ? <NodeDetailWithSuspense /> : null}</> */}
      <>{!isServer ? <NodeListWithSuspense /> : null}</>
    </>
  )
}

export default Index
