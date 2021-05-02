import { useComponentBuilder } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { Tree } from 'antd'
import React from 'react'

export const ComponentTab = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()

  if (!selectedComponent) {
    return null
  }

  const cy = CytoscapeService.fromComponent(selectedComponent)
  const tree = CytoscapeService.componentTree(cy)

  console.log(tree)

  return (
    <Tree
      draggable
      showIcon
      checkable
      selectable
      defaultExpandAll
      defaultExpandedKeys={[]}
      autoExpandParent
      treeData={[]}
      className="draggable-tree"
    />
  )
}
