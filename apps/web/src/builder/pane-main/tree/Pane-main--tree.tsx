import { Tree } from 'antd'
import React, { useContext } from 'react'
import { CytoscapeService } from '@codelab/frontend'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

export const PaneMainTree = () => {
  const { page } = useContext(AppContext)
  // const onSelect = (id: React.Key) => {
  //   setBuilderDrawer({ visible: true, vertexId: `${id}` })
  // }

  const cy = CytoscapeService.fromGraph(page.graphs[0])
  const data = CytoscapeService.antdTree(cy)

  return (
    <>
      <Tree
        className="draggable-tree"
        // defaultExpandedKeys={this.state.expandedKeys}
        draggable
        blockNode
        onSelect={([id]) => {
          // onSelect(id)
        }}
        // onDrop={this.onDrop}
        treeData={[data]}
      />
    </>
  )
}
