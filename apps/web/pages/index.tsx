import { useActor } from '@xstate/react'
import { Form } from 'antd'
import React, { useContext } from 'react'
import {
  FormNode,
  MachineContext,
  Modal,
  ModalButton,
} from '@codelab/ui/component'

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [state, send] = useActor(actors.modal)
  const [form] = Form.useForm()

  return (
    <>
      <ModalButton actor={actors.modal} />
      <Modal actor={actors.modal}>
        <FormNode actor={actors.modal} form={form} />
      </Modal>

      <p>Modal state: {JSON.stringify(state.value)}</p>
      <p>Modal context: {JSON.stringify(state.context)}</p>
    </>
  )
}

export default Index
