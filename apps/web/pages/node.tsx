/* eslint-disable no-underscore-dangle */
import { DataNode } from 'antd/lib/tree'
import axios from 'axios'
import React from 'react'
import { ButtonGroup } from '../src/node/ButtonGroup'
import { ModalForm } from '../src/node/ModalForm'
import { NodeTree } from '../src/node/NodeTree'
import { Table } from '../src/node/Table'
import { convertNodeTreeToAntTreeDataNode } from '../src/node/utils/convertNodeTreeToAntTreeNode'
import { NodeEntity } from '@codelab/core/node'
import { BaseNodeType, Node } from '@codelab/shared/interface/node'

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const NodePage = () => {
  const [selectedNode, setSelectedNode] = React.useState(null)
  const [rootNode, setRootNode] = React.useState<Node | null>(null)
  const [treeDataNodes, setTreeDataNodes] = React.useState<Array<DataNode>>([])
  const [visibility, setVisibility] = React.useState<boolean>(false)
  const [nodes, setNodes] = React.useState([])
  const [editedNode, setEditedNode] = React.useState<any>(null)

  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchNodes()
  }, [])

  const fetchNodes = () => {
    axios
      .get('/api/v1/Node')
      .then((res) => {
        setNodes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const findChildren = (inputNodes) => {
    return inputNodes.map((node) => {
      const children = inputNodes.filter(
        (childNode) => childNode.parent === node._id,
      )

      return {
        ...node,
        children,
      }
    })
  }

  // TODO: specify type of values. It should combine types for all types(React, Tree, Model, etc)
  const addChild = (values: any) => {
    console.log('addChild', this)
    const newNode = new NodeEntity(values)

    if (rootNode === null) {
      setRootNode(newNode)
      setTreeDataNodes([convertNodeTreeToAntTreeDataNode(newNode)])
    } else {
      rootNode.addChild(newNode)
      setTreeDataNodes([convertNodeTreeToAntTreeDataNode(rootNode)])
    }
  }

  const selectNode = (values: any) => {
    console.log(values)
  }

  const handleCreateNode = (formData: any) => {
    console.log(formData)

    axios
      .post('/api/v1/Node', formData)
      .then((res: any) => {
        const { data } = res
        const newNodes: any = [...nodes]

        data.key = data._id
        newNodes.push(res.data)

        setNodes(newNodes)
        setVisibility(false)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateNode = (formData: any) => {
    console.log(formData)
    if (typeof editedNode?._id) {
      return
    }

    axios
      .patch(`/api/v1/Node/${editedNode._id}`, formData)
      .then((res) => {
        const { data } = res

        const index = nodes.map((node: any) => node._id).indexOf(editedNode._id)
        const newNodes: any = [...nodes]

        newNodes[index] = data

        setNodes(newNodes)
      })
      .catch((err) => console.log(err))
  }

  const deleteNode = () => {
    console.log('delete node fired!')
  }

  const handleDeleteNode = (nodeId: any) => {
    console.log('delete node fired!', nodeId)

    axios
      .delete(`/api/v1/Node/${nodeId}`)
      .then((res) => {
        fetchNodes()
      })
      .catch((err) => console.log(err))
  }

  const showEditModal = (nodeId: any) => {
    const editNode: any = nodes.find((node: any) => node._id === nodeId)

    setEditedNode({
      nodeType: BaseNodeType.React,
      ...editNode,
    })
  }

  const data = findChildren(
    selectedNode
      ? nodes.filter((node) => {
          return node._id === selectedNode
        })
      : nodes,
  )

  const parentNodes = [
    { label: 'none', value: null },
    ...nodes.map((node: any) => {
      return { label: node._id, value: node._id }
    }),
  ]

  return (
    <>
      <ButtonGroup
        setvisibility={setVisibility}
        selectedNode={selectedNode}
        handledelete={deleteNode}
        clearfilter={() => setSelectedNode(null)}
      />
      <ModalForm
        handlesubmit={handleCreateNode}
        visibility={visibility}
        handlecancel={() => setVisibility(false)}
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
      <NodeTree />
      <Table
        data={data.map((node: any) => ({ ...node, key: node._id }))}
        selectnode={setSelectedNode}
        handleedit={showEditModal}
        handledelete={handleDeleteNode}
      />
    </>
  )
}

export default NodePage
