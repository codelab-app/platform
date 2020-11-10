import { useActor } from '@xstate/react'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { PageNodesComp } from '@codelab/state/apollo'
import { MachineContext } from '@codelab/ui/component'

const MachineDataLoaderPage: PageNodesComp = (props) => {
  const { app, actors } = useContext(MachineContext)

  const [graphQLState, sendGraphQLDemo] = useActor(actors.graphQLDemo)
  const createVertex = () => {
    sendGraphQLDemo({
      type: 'CreateVertex',
      payload: {
        label: 'New Vertex',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    } as any)
  }

  const createEdge = () => {
    sendGraphQLDemo({
      type: 'CreateEdge',
      payload: {
        source: 'source',
        target: 'target',
        label: 'New Vertex',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    } as any)
  }

  return (
    <>
      <Button onClick={createVertex}> create vertex</Button>
      <Button onClick={createEdge}> create edge</Button>
      <div>
        <h1> vertices</h1>
        {graphQLState.context?.vertices.map((vertex: any, index: number) => (
          <div key={vertex.id}>{`${index} - ${vertex.id}`}</div>
        ))}
      </div>
      <div>
        <h1> edges</h1>
        {graphQLState.context?.edges.map((edge: any, index: number) => (
          <div key={edge.id}>{`${index} - ${edge.id}`}</div>
        ))}
      </div>
    </>
  )
}

export default MachineDataLoaderPage
