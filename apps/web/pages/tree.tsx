/* eslint-disable no-underscore-dangle */
import { DataNode, TreeProps } from 'antd/lib/tree'
import axios from 'axios'
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'
import React from 'react'
import { ModalForm } from '../src/node/ModalForm'
import { NodeTree, NodeTreeProps } from '../src/node/NodeTree'
import { Table } from '../src/node/Table'
import { convertNodeTreeToAntTreeDataNode } from '../src/node/utils/convertNodeTreeToAntTreeNode'
import { ButtonGroup } from '../src/tree/ButtonGroup'
import { NodeEntity } from '@codelab/core/node'
import { findNode } from '@codelab/core/tree'
import { BaseNodeType, NodeA } from '@codelab/shared/interface/node'

hljs.registerLanguage('json', json)

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const TreePage = () => {
  const [selectedNode, setSelectedNode] = React.useState<
    NodeEntity | undefined
  >(undefined)
  const [rootNode, setRootNode] = React.useState<NodeEntity | null>(null)
  const [treeData, setTreeData] = React.useState<Array<DataNode>>([])
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

  const selectedNodeDetailsRef = React.useRef(null)

  React.useEffect(() => {
    let mounted = true

    if (mounted) {
      hljs.highlightBlock(
        (selectedNodeDetailsRef.current as unknown) as HTMLElement,
      )
    }

    return function cleanup() {
      mounted = false
    }
  }, [selectedNode])

  // TODO: specify type of values. It should combine types for all types(React, Tree, Model, etc)
  const addChild = (values: any) => {
    console.log('addChild', this)
    const newNode = new NodeEntity(values)

    if (rootNode === null) {
      setRootNode(newNode)
      setTreeData([convertNodeTreeToAntTreeDataNode(newNode)])
    } else if (selectedNode !== undefined) {
      selectedNode.addChild(newNode)
      setTreeData([convertNodeTreeToAntTreeDataNode(rootNode)])
    } else {
      rootNode.addChild(newNode)
      setTreeData([convertNodeTreeToAntTreeDataNode(rootNode)])
    }
  }

  const handleSelectNode: NodeTreeProps['onselect'] = (selectedKeys) => {
    setSelectedNode(
      findNode(selectedKeys[0] as string | undefined, rootNode as NodeA) as
        | NodeEntity
        | undefined,
    )
  }

  const selectNode = (values: any) => {
    console.log(values)
  }

  const handleCreateNode = (formData: any) => {
    console.log(formData)
    addChild(formData)
    setVisibility(false)
    // axios
    //   .post('/api/v1/Node', formData)
    //   .then((res: any) => {
    //     const { data } = res
    //     const newNodes: any = [...nodes]

    //     data.key = data._id
    //     newNodes.push(res.data)

    //     setNodes(newNodes)
    //     setVisibility(false)
    //   })
    //   .catch((err) => console.log(err))
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
    if (selectedNode !== undefined) {
      if (selectedNode === selectedNode.getRoot()) {
        setRootNode(null)
        setTreeData([])
      } else {
        selectedNode.parent?.removeChild(selectedNode)
        setTreeData([convertNodeTreeToAntTreeDataNode(rootNode as NodeEntity)])
      }

      setSelectedNode(undefined)
    }
  }

  const handleDeleteNode = (nodeId: any) => {
    console.log('delete node fired!', nodeId)

    axios
      .delete(`/api/v1/Node/${nodeId}`)
      .then((res) => {
        const index = nodes.map((node: any) => node._id).indexOf(nodeId)
        const newNodes = [...nodes]

        newNodes.splice(index, 1)

        setNodes(newNodes)
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

  const data = selectedNode
    ? nodes.filter((node: any) => {
        return node._id === selectedNode
      })
    : nodes
  const handeNodeMove: TreeProps['onDrop'] = ({
    dragNode: treeNode,
    node: newTreeNodeParent,
  }) => {
    const node = findNode(
      treeNode.key as string,
      rootNode as NodeEntity,
    ) as NodeEntity
    const newParentNode = findNode(
      newTreeNodeParent.key as string,
      rootNode as NodeEntity,
    ) as NodeEntity

    node.move(newParentNode)
    setTreeData([convertNodeTreeToAntTreeDataNode(rootNode as NodeEntity)])
  }

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
        selectednodename={selectedNode ? selectedNode.type : ''}
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
        data={data.map((node: any) => ({ ...node, key: node._id }))}
        selectnode={setSelectedNode}
        handleedit={showEditModal}
        handledelete={handleDeleteNode}
      />
    </>
  )
}

export default TreePage
