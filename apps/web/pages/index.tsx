import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import {
  FormNode,
  MachineContext,
  Modal,
  ModalButton,
  NodeFormData,
  Table,
} from '@codelab/ui/component'
import { withSuspense } from '@codelab/ui/hoc'

const isServer = typeof window === 'undefined'

const TableNodeWithSuspense = withSuspense(() => (
  <NodeFormData>
    {(data) => {
      console.log(data)

      return (
        <Table
          data={data}
          // selectnode={() => null}
          // handleedit={() => null}
          // handledelete={() => null}
        />
      )
    }}
  </NodeFormData>
))

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [state, send] = useActor(actors.modal)

  return (
    <>
      <ModalButton actor={actors.modal} />
      <Modal actor={actors.modal}>
        <FormNode
          actor={actors.modal}
          handleSubmit={(values: object) => {
            console.log(values)
          }}
        />
      </Modal>

      <>{!isServer ? <TableNodeWithSuspense /> : null}</>

      <p>Modal state: {JSON.stringify(state.value)}</p>
      <p>Modal context: {JSON.stringify(state.context)}</p>
    </>
  )
}

export default Index
