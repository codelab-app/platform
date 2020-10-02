/* eslint-disable no-underscore-dangle */
import { DataNode } from 'antd/lib/tree'
import axios from 'axios'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import React from 'react'
import { ButtonGroup } from '../src/node/ButtonGroup'
import { ModalForm } from '../src/node/ModalForm'
import { NodeTree, NodeTreeProps } from '../src/node/NodeTree'
import { Table } from '../src/node/Table'
import { convertNodeTreeToAntTreeDataNode } from '../src/node/utils/convertNodeTreeToAntTreeNode'
import { NodeEntity } from '@codelab/core/node'
import { findNode } from '@codelab/core/tree'
import { BaseNodeType, NodeCreate } from '@codelab/shared/interface/node'

hljs.registerLanguage('json', json)

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const NodePage = () => {
  const [selectedNode, setSelectedNode] = React.useState<
    NodeEntity | undefined
  >(undefined)
  const [rootNode, setRootNode] = React.useState<NodeEntity | null>(null)
  const [treeData, setTreeData] = React.useState<Array<DataNode>>([])
  const [visibility, setVisibility] = React.useState<boolean>(false)
  const [nodes, setNodes] = React.useState([])
  const [editedNode, setEditedNode] = React.useState(null)

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

  const selectedNodeDetailsRef = React.useRef(null)

  React.useEffect(() => {
    let mounted = true

    if (mounted) {
      hljs.highlightBlock(selectedNodeDetailsRef.current)
    }

    return function cleanup() {
      mounted = false
    }
  }, [selectedNode])

  // TODO: specify type of values. It should combine types for all types(React, Tree, Model, etc)
  const addChild = (values: NodeCreate) => {
    const newNode = new NodeEntity(values)

    switch (true) {
      case rootNode === null:
        setRootNode(newNode)
        setTreeData([convertNodeTreeToAntTreeDataNode(newNode)])
        break
      case selectedNode !== undefined:
        selectedNode.addChild(newNode)
        setTreeData([convertNodeTreeToAntTreeDataNode(rootNode)])
        break
      default:
        rootNode.addChild(newNode)
        setTreeData([convertNodeTreeToAntTreeDataNode(rootNode)])
        break
    }
  }

  const handleSelectNode: NodeTreeProps['onselect'] = (selectedKeys, e) => {
    setSelectedNode(
      findNode(selectedKeys[0] as string | undefined, rootNode) as
        | NodeEntity
        | undefined,
    )
  }

  const handleCreateNode = (formData) => {
    addChild(formData)

    axios
      .post('/api/v1/Node', formData)
      .then((res) => {
        const { data } = res
        const newNodes = [...nodes]

        data.key = data._id
        newNodes.push(res.data)

        setNodes(newNodes)
        setVisibility(false)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateNode = (formData) => {
    console.log(formData)

    axios
      .patch(`/api/v1/Node/${editedNode._id}`, formData)
      .then((res) => {
        const { data } = res

        const index = nodes.map((node) => node._id).indexOf(editedNode._id)
        const newNodes = [...nodes]

        newNodes[index] = data

        setNodes(newNodes)
      })
      .catch((err) => console.log(err))
  }

  const deleteNode = () => {
    if (selectedNode !== undefined) {
      if (selectedNode === selectedNode.getRoot()) {
        setRootNode(null)
        setTreeData([])
      } else {
        selectedNode.parent.removeChild(selectedNode)
        setTreeData([convertNodeTreeToAntTreeDataNode(rootNode)])
      }

      setSelectedNode(undefined)
    }
  }

  const handleDeleteNode = (nodeId) => {
    console.log('delete node fired!', nodeId)

    axios
      .delete(`/api/v1/Node/${nodeId}`)
      .then((res) => {
        const index = nodes.map((node) => node._id).indexOf(nodeId)
        const newNodes = [...nodes]

        newNodes.splice(index, 1)

        setNodes(newNodes)
      })
      .catch((err) => console.log(err))
  }

  const showEditModal = (nodeId) => {
    const editNode = nodes.find((node) => node._id === nodeId)

    setEditedNode({
      nodeType: BaseNodeType.React,
      ...editNode,
    })
  }

  const data = selectedNode
    ? nodes.filter((node) => {
        return node._id === selectedNode
      })
    : nodes
  const handeNodeMove = ({ dragNode: treeNode, node: newTreeNodeParent }) => {
    const node = findNode(treeNode.key as string, rootNode) as NodeEntity
    const newParentNode = findNode(
      newTreeNodeParent.key as string,
      rootNode,
    ) as NodeEntity

    node.move(newParentNode)
    setTreeData([convertNodeTreeToAntTreeDataNode(rootNode)])
  }

  const parentNodes = [
    { label: 'none', value: null },
    ...nodes.map((node) => {
      return { label: node._id, value: node._id }
    }),
  ]

  return (
    <>
      <ButtonGroup
        setvisibility={setVisibility}
        selectednodename={selectedNode ? selectedNode.type : null}
        handledelete={deleteNode}
        clearfilter={() => setSelectedNode(undefined)}
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
      <NodeTree
        treedata={treeData}
        onselect={handleSelectNode}
        ondrop={handeNodeMove}
      />
      <pre>
        <code ref={selectedNodeDetailsRef}>
          {selectedNode !== undefined
            ? JSON.stringify(selectedNode.data, null, 2)
            : ''}
        </code>
      </pre>
      <Table
        data={data.map((node) => ({ ...node, key: node._id }))}
        selectnode={setSelectedNode}
        handleedit={showEditModal}
        handledelete={handleDeleteNode}
      />
    </>
  )
}

export default NodePage
