import { Button } from 'antd'
import React, { useContext } from 'react'
import {
  NodeType,
  PageNodesComp,
  ssrNodes,
  useNodeCreateMutation,
  useNodeDeleteMutation,
} from '@codelab/state/apollo'
import { withApollo } from '@codelab/ui/hoc'
import { MachineContext, NodeServiceContext } from '@codelab/ui/component'
import { useActor } from '@xstate/react'


const MachineDataLoaderPage: PageNodesComp = (props) => {
  const { app, actors } = useContext(MachineContext)

  // const [stateNode, sendNode] = useActor(actors.node)

  // console.log('component', stateNode.context)
  return (
    <div>rendered</div>
  )
}

export default MachineDataLoaderPage
// export default withApollo(ssrNodes.withPage(() => ({}))(MachineDataLoaderPage))
