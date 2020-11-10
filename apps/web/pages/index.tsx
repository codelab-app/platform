import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import { BaseNodeType, NodeA } from '@codelab/shared/interface/node'
import {
  ContextNode,
  EventNameNode,
  EventNode,
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

const Index = () => {
  const { actors } = useContext(MachineContext)
  const [nodeState, nodeSend] = useActor<ContextNode, EventNode>(actors.node)

  const handlecancel = () => {
    // actors.modal.send({ type: EventNameModal.CLOSE })
    if (nodeState.value === StateNameNode.EDITING) {
      nodeSend({ type: EventNameNode.NODE_EDIT_CANCEL })
    }
  }

  const handlesubmit = (values: any) => {
    return nodeState.value === StateNameNode.EDITING
      ? nodeSend({
          type: EventNameNode.NODE_EDIT_SUBMIT,
          payload: values,
        })
      : nodeSend({
          type: EventNameNode.NODE_CREATE,
          payload: values,
        })
  }
  const initialvalues =
    nodeState.value === StateNameNode.EDITING
      ? {
          nodeType: BaseNodeType.React,
          ...nodeState.context.editedNode,
        }
      : {
          nodeType: BaseNodeType.React,
          parent: null,
        }

  const handleedit = (nodeId: NodeA['id']) =>
    nodeSend({ type: EventNameNode.NODE_EDIT, payload: nodeId })

  const handledelete = (nodeId: NodeA['id']) =>
    nodeSend({ type: EventNameNode.NODE_DELETE, payload: nodeId })

  const modalProps = {
    handlecancel,
    actor: actors.modal,
  }

  const formNodeProps = {
    actor: actors.modal,
    handlesubmit,
    initialvalues,
  }

  const tableProps = {
    data: nodeState.context.nodes.map((node: any) => ({
      ...node,
      key: node.id,
    })),
    handleedit,
    handledelete,
    selectnode: () => null,
  }

  return (
    <>
      <Layout
        actor={actors.layout}
        content={
          <>
            {/* <ReactJson data={actors.modal.state} /> */}
            <ModalButton actor={actors.modal} />
            <Modal {...modalProps}>
              <FormNode {...formNodeProps} />
            </Modal>
            <Table {...tableProps} />
          </>
        }
        sidebar={<></>}
        header={<></>}
        footer={<></>}
      />
    </>
  )
}

export default Index
