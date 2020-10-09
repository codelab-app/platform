import { useActor } from '@xstate/react'
import { Button } from 'antd'
import React from 'react'
import { EventModal, EventNameModal } from '@codelab/state/modal'
import { EventNameNode, EventNode } from '@codelab/state/node'

const Index = (props: any) => {
  const machineModal = props.stateApp.context.machineModalRef
  const machineNode = props.stateApp.context.machineNodeRef
  const [stateModal, sendModal] = useActor<EventModal>(machineModal)
  const [stateNode, sendNode] = useActor<EventNode>(machineNode)

  return (
    <>
      <Button onClick={() => sendNode({ type: EventNameNode.LOAD })}>
        Load
      </Button>
      <Button onClick={() => sendModal({ type: EventNameModal.OPEN })}>
        On
      </Button>
      <Button onClick={() => sendModal({ type: EventNameModal.CLOSE })}>
        Off
      </Button>
      <p>App state: {JSON.stringify(props.stateApp.value)}</p>
      <p>Modal state: {JSON.stringify(stateModal.value)}</p>
      <p>Node state: {JSON.stringify(stateNode.context.nodes)}</p>
    </>
  )
}

export default Index
