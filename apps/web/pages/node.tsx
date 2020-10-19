/* eslint-disable no-underscore-dangle */

import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import Highlight from 'react-highlight'
import { ButtonGroup } from '../src/node/ButtonGroup'
import { ModalForm } from '../src/node/ModalForm'
import { Table } from '../src/node/Table'
import { BaseNodeType } from '@codelab/shared/interface/node'
import { MachineContext, NodeServiceContext } from '@codelab/ui/component'

const NodePage = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [uiModal, sendUI] = useActor(actors.ui)
  const [selectedNode, setSelectedNode] = React.useState(null)
  const [nodes, setNodes] = React.useState([])
  const [editedNode, setEditedNode] = React.useState<any>(null)
  const { nodeService } = useContext(NodeServiceContext)

  console.log(nodeService)

  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchNodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchNodes = () => {
    const cb = (data: any) => {
      setNodes(data)
    }

    nodeService.getNodes(cb)
  }

  const findChildren = (inputNodes: Array<any>) => {
    return inputNodes.map((node) => {
      const children = inputNodes.filter(
        (childNode) => childNode.parent === node.id,
      )

      return {
        ...node,
        children,
      }
    })
  }

  const handleCreateNode = (formData: any) => {
    console.log(formData)

    const cb = (data: any) => {
      const newNodes: any = [...nodes]

      // eslint-disable-next-line no-param-reassign
      data.key = data.id
      newNodes.push(data)

      setNodes(newNodes)
      sendUI({ type: 'CLOSE_MODAL' })
    }

    nodeService.createNode(formData, cb)
  }

  const handleUpdateNode = (formData: any) => {
    console.log(formData)
    console.log(editedNode)

    const cb = (data: any) => {
      const index = nodes.map((node: any) => node.id).indexOf(editedNode.id)
      const newNodes: any = [...nodes]

      newNodes[index] = data

      setEditedNode(null)
      setNodes(newNodes)
    }

    nodeService.updateNode(formData, cb)
  }

  const deleteNode = () => {
    console.log('delete node fired!')
  }

  const handleDeleteNode = (nodeId: any) => {
    console.log('delete node fired!', nodeId)

    const cb = () => fetchNodes()

    nodeService.deleteNode(nodeId, cb)
  }

  const showEditModal = (nodeId: any) => {
    const editNode: any = nodes.find((node: any) => node.id === nodeId)

    setEditedNode({
      nodeType: BaseNodeType.React,
      ...editNode,
    })
  }

  const data = findChildren(
    selectedNode
      ? nodes.filter((node: any) => {
          return node.id === selectedNode
        })
      : nodes,
  )

  const parentNodes = [
    // { label: 'none', value: null },
    ...nodes.map((node: any) => {
      return { label: node.id, value: node.id }
    }),
  ]

  return (
    <>
      <Highlight className="json">{JSON.stringify({ a: 1, b: 2 })}</Highlight>
      <ButtonGroup
        openmodal={() => sendUI('OPEN_MODAL')}
        selectedNode={selectedNode}
        handledelete={deleteNode}
        clearfilter={() => setSelectedNode(null)}
      />
      <ModalForm
        handlesubmit={handleCreateNode}
        visibility={uiModal.context.visible}
        handlecancel={() => sendUI('CLOSE_MODAL')}
        parentnodes={parentNodes}
        initialvalues={{
          nodeType: BaseNodeType.React,
          parent: null,
        }}
      />
      <ModalForm
        handlesubmit={handleUpdateNode}
        visibility={!!editedNode}
        handlecancel={() => setEditedNode(null)}
        parentnodes={parentNodes}
        initialvalues={editedNode}
      />
      <Table
        data={data.map((node: any) => ({ ...node, key: node.id }))}
        selectnode={setSelectedNode}
        handleedit={showEditModal}
        handledelete={handleDeleteNode}
      />
    </>
  )
}

export default NodePage
