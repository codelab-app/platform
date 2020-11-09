import React, { useContext } from 'react'
import { PageNodesComp } from '@codelab/state/apollo'
import { MachineContext } from '@codelab/ui/component'

const MachineDataLoaderPage: PageNodesComp = (props) => {
  const { app, actors } = useContext(MachineContext)

  // const [stateNode, sendNode] = useActor(actors.node)

  // console.log('component', stateNode.context)
  return <div>rendered</div>
}

export default MachineDataLoaderPage
// export default withApollo(ssrNodes.withPage(() => ({}))(MachineDataLoaderPage))
