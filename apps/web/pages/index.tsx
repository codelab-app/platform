import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import { ContextNode, EventNameNode, EventNode } from '@codelab/state/node'
import {
  FormNode,
  Layout,
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
      return (
        <Table
          data={data}
          selectnode={() => null}
          handleedit={() => null}
          handledelete={() => null}
        />
      )
    }}
  </NodeFormData>
))

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [modalState] = useActor(actors.modal)
  const [layoutState] = useActor(actors.layout)
  const [nodeState, nodeSend] = useActor<ContextNode, EventNode>(actors.node)
  // <>{!isServer ? <TableNodeWithSuspense /> : null}</>

  return (
    <>
      <Layout
        actor={actors.layout}
        content={
          <>
            <ModalButton actor={actors.modal} />
            <Modal actor={actors.modal}>
              <FormNode
                actor={actors.modal}
                handlesubmit={(values: object) => {
                  nodeSend({ type: EventNameNode.NODE_CREATE, payload: values })
                }}
              />
            </Modal>
            <Table
              data={nodeState.context.nodes.map((node: any) => ({
                ...node,
                key: node.id,
              }))}
              selectnode={() => null}
              handleedit={() => null}
              handledelete={() => null}
            />
            <p>modal state: {JSON.stringify(modalState.value)}</p>
            <p>modal context: {JSON.stringify(modalState.context)}</p>
            <p>layout state: {JSON.stringify(layoutState.value)}</p>
            <p>layout context: {JSON.stringify(layoutState.context)}</p>
          </>
        }
        sidebar={<>Side bar</>}
        header={<>Header</>}
        footer={<>Footer</>}
      />
    </>
  )
}

export default Index
