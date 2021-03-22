import { Tree } from 'antd'
import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../pages/builder/pane-config/Pane-config'
import { AtomType, CytoscapeService } from '@codelab/frontend'
import { PaneMainTemplate } from 'apps/web/src/templates/Pane-main--template'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

export const PaneMainTree = () => {
  const [, setPaneConfig] = useRecoilState(paneConfigState)
  const { page } = useContext(AppContext)
  const onSelect = (id: React.Key) => {
    setPaneConfig({ vertexId: `${id}` })
  }

  if (!page || !page.graphs || !page.graphs.length) {
    return null
  }

  const cy = CytoscapeService.fromGraph(page.graphs[0])
  const data = CytoscapeService.antdTree(cy)

  const onDrop = ({ dragNode, node: targetNode }: any) => {
    // Disable drag
    if (dragNode.type !== AtomType.ReactRglItem) {
      console.log(dragNode.id, targetNode.id)
    }
  }

  return (
    <PaneMainTemplate title="Tree" header={<></>}>
      <Tree
        className="draggable-tree"
        defaultExpandAll
        // defaultExpandedKeys={this.state.expandedKeys}
        blockNode
        onSelect={([id]) => {
          onSelect(id)
        }}
        onDrop={onDrop}
        treeData={[data]}
      />
    </PaneMainTemplate>
  )
}
