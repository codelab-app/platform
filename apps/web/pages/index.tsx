/* eslint-disable no-unused-expressions */

import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import { BaseNodeType, NodeA } from '@codelab/shared/interface/node'
import {
  ContextNode,
  EventNameNode,
  EventNode,
  EventNodeCreate,
  EventNodeEditSubmit,
  StateNameNode,
} from '@codelab/state/node'
import {
  FormNode,
  Layout,
  MachineContext,
  Modal,
  ModalButton,
  Table,
} from '@codelab/ui/component'

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [modalState] = useActor(actors.modal)
  const [layoutState] = useActor(actors.layout)
  const [nodeState, nodeSend] = useActor<ContextNode, EventNode>(actors.node)

  // <p>modal state: {JSON.stringify(modalState.value)}</p>
  // <p>modal context: {JSON.stringify(modalState.context)}</p>
  // <p>modal state: {JSON.stringify(modalState.value)}</p>
  // <p>modal context: {JSON.stringify(modalState.context)}</p>
  return (
    <>
      <Layout
        actor={actors.layout}
        content={
          <>
            <ModalButton actor={actors.modal} />
            <Modal
              actor={actors.modal}
              handlecancel={() => {
                nodeState.value === StateNameNode.EDITING
                  ? nodeSend({ type: EventNameNode.NODE_EDIT_CANCEL })
                  : null
              }}
            >
              <FormNode
                actor={actors.modal}
                handlesubmit={(values: object) => {
                  nodeState.value === StateNameNode.EDITING
                    ? nodeSend({
                        type: EventNameNode.NODE_EDIT_SUBMIT,
                        payload: values,
                      } as EventNodeEditSubmit)
                    : nodeSend({
                        type: EventNameNode.NODE_CREATE,
                        payload: values,
                      } as EventNodeCreate)
                }}
                initialvalues={
                  nodeState.value === StateNameNode.EDITING
                    ? {
                        nodeType: BaseNodeType.React,
                        ...nodeState.context.editedNode,
                      }
                    : {
                        nodeType: BaseNodeType.React,
                        parent: null,
                      }
                }
              />
            </Modal>
            <Table
              data={nodeState.context.nodes.map((node: any) => ({
                ...node,
                key: node.id,
              }))}
              selectnode={() => null}
              handleedit={(nodeId: NodeA['id']) =>
                nodeSend({ type: EventNameNode.NODE_EDIT, payload: nodeId })
              }
              handledelete={(nodeId: NodeA['id']) =>
                nodeSend({ type: EventNameNode.NODE_DELETE, payload: nodeId })
              }
            />
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
