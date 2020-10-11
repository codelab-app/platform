import { useActor } from '@xstate/react'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { EventNameModal } from '@codelab/state/modal'
import { MachineContext } from '@codelab/ui/component'

const Index = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [state, send] = useActor(actors.modal)

  return (
    <>
      <Button onClick={() => send({ type: EventNameModal.OPEN })}>On</Button>
      <Button onClick={() => send({ type: EventNameModal.CLOSE })}>Off</Button>
      {/* <p>App state: {JSON.stringify(props.stateApp.value)}</p> */}
      <p>Modal state: {JSON.stringify(state.value)}</p>
      <p>Modal context: {JSON.stringify(state.context)}</p>
    </>
  )
}

export default Index
