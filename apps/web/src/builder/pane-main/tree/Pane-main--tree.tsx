import { VertexType } from '@prisma/client'
import { Tree } from 'antd'
import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../pane-config/Pane-config'
import { CytoscapeService } from '@codelab/frontend'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

export const PaneMainTree = () => {
  const [, setBuilderDrawer] = useRecoilState(paneConfigState)
  const { page } = useContext(AppContext)
  const onSelect = (id: React.Key) => {
    setBuilderDrawer({ visible: true, vertexId: `${id}` })
  }

  if (!page || !page.graphs || !page.graphs.length) {
    return null
  }

  const cy = CytoscapeService.fromGraph(page.graphs[0])
  const data = CytoscapeService.antdTree(cy)

  const onDrop = ({ dragNode, node: targetNode }: any) => {
    // Disable drag
    if (dragNode.type !== VertexType.React_RGL_Item) {
      console.log(dragNode.id, targetNode.id)
    }
  }

  return (
    <>
      <Tree
        className="draggable-tree"
        // defaultExpandedKeys={this.state.expandedKeys}
        draggable={(e: any) => e.type !== VertexType.React_RGL_Item}
        blockNode
        onSelect={([id]) => {
          onSelect(id)
        }}
        onDrop={onDrop}
        treeData={[data]}
      />
    </>
  )
}
