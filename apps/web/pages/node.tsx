import { DataNode } from 'antd/lib/tree'
import React from 'react'
import { ButtonGroup } from '../src/node/ButtonGroup'
import { ModalForm } from '../src/node/ModalForm'
import { NodeTree } from '../src/node/NodeTree'
import { convertNodeTreeToAntTreeDataNode } from '../src/node/utils/convertNodeTreeToAntTreeNode'
import { Node } from '@codelab/core/node'

const NodePage = () => {
  const [selectedNode, setSelectedNode] = React.useState(null)
  const [rootNode, setRootNode] = React.useState<Node | null>(null)
  const [treeDataNodes, setTreeDataNodes] = React.useState<Array<DataNode>>([])
  const [visibility, setVisibility] = React.useState<boolean>(false)

  // TODO: specify type of values. It should combine types for all types(React, Tree, Model, etc)
  const addChild = (values) => {
    console.log('addChild', this)
    const newNode = new Node(values)

    if (rootNode === null) {
      setRootNode(newNode)
      setTreeDataNodes([convertNodeTreeToAntTreeDataNode(newNode)])
    } else {
      rootNode.addChild(newNode)
      setTreeDataNodes([convertNodeTreeToAntTreeDataNode(rootNode)])
    }
  }
  const selectNode = (values) => {
    console.log(values)
  }
  const handleSubmitForm = (data) => {
    setVisibility(false)
    console.log(data)
  }
  const deleteNode = () => {
    console.log('delete node fired!')
  }

  return (
    <>
      <ButtonGroup setvisibility={setVisibility} handledelete={deleteNode} />
      <ModalForm
        handlesubmit={handleSubmitForm}
        visibility={visibility}
        setvisibility={setVisibility}
      />
      <NodeTree />
    </>
  )
}

export default NodePage
