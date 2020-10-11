import { useMachine } from '@xstate/react'
import React from 'react'
import { modal, modalButton } from './Modal'
import { Renderer } from '@codelab/core/renderer'
import { machineApp } from '@codelab/state/app'
import { machineModal } from '@codelab/state/modal'

export default {
  title: 'Modal',
}

const Comp = (props: any) => {
  const [state, send] = useMachine(machineModal)

  console.log(state.context)

  return <p>Modal</p>
}

export const Default = () => {
  const [state, send] = useMachine(machineApp)

  console.log(state.context)

  const ModalButton = Renderer.components(modalButton)
  const Modal = Renderer.components(modal)
  // const ModalWithActor = withActor(Modal)

  // return <ModalWithActor actor={actor} />
  return (
    // <MachineProvider machine={machineApp}>
    <Comp />
    // </MachineProvider>
  )
}
