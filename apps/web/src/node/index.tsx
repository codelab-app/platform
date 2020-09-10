import React from 'react'
import { ReactNodeI } from '@codelab/shared/interface/node'
import { Node as CoreNode } from '@codelab/core/node'
import { TreeDom } from '@codelab/core/renderer'
import { DataNode } from 'antd/lib/tree'
import { NodeMngmtPanelData, NodeMngmtPanelProps } from './NodeMngmtPanel.Data'
import { convertNodeTreeToAntTreeDataNode } from './convertNodeTreeToAntTreeNode'
import { FormData } from './Form.Data'

import { treeData } from './Tree.Data'

// TODO Implement draft Node adding = props are empty
// TODO Implement Popover for adding props (currently it's not clear how get access to add button, it's under the hood)

// TODO: add type for Node
type IRootNode = CoreNode | null

export const Node = () => {
  const [selectedNode, setSelectedNode] = React.useState(null)
  const [rootNode, setRootNode] = React.useState<IRootNode>(null)
  const [treeDataNodes, setTreeDataNodes] = React.useState<Array<DataNode>>([])
  const [isModalShown, setModalVisibility] = React.useState<boolean>(false)

  // TODO specify type of values. It should combine types for all types(React, Tree, Model, etc)
  const addChild = (values) => {
    console.log('addChild', this)
    const newNode = new CoreNode(values)

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
  const handleSubmitForm = (formData) => {
    setModalVisibility(false)
    console.log(formData)
  }
  const showForm = () => {
    setModalVisibility(true)
  }
  const deleteNode = () => {
    console.log('delete node fired!')
  }

  const NodeMngmtPanel = TreeDom.render<NodeMngmtPanelProps>(NodeMngmtPanelData)
  const ModalForm = TreeDom.render(FormData)
  const NodeTree = TreeDom.render(treeData)

  return (
    <>
      <NodeMngmtPanel
        onAddNodeRequested={showForm}
        onDeleteNodeRequested={deleteNode}
      />
      <ModalForm onSubmitForm={handleSubmitForm} isModalShown={isModalShown} />
      <NodeTree />
    </>
  )
}
