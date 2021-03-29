import { Empty, Tree } from 'antd'
import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../pages/builder/pane-config/Pane-config'
import { AtomType, CytoscapeService } from '@codelab/frontend/shared'
import { PaneMainTemplate } from 'apps/web/src/templates/Pane-main--template'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

export const PaneMainTree = () => {
  const [, setPaneConfig] = useRecoilState(paneConfigState)
  const { page } = useContext(AppContext)
  const onSelect = (id: React.Key) => {
    setPaneConfig({ vertexId: `${id}` })
  }

  const cy = CytoscapeService.fromGraph(page?.elements || [], page?.links || [])
  const data = CytoscapeService.antdTree(cy)

  const onDrop = ({ dragNode, node: targetNode }: any) => {
    // Disable drag
    if (dragNode.type !== AtomType.ReactRglItem) {
      console.log(dragNode.id, targetNode.id)
    }
  }

  return (
    <PaneMainTemplate title="Tree" header={<></>}>
      {page && page.elements && page.elements.length ? (
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
      ) : (
        <Empty />
      )}
    </PaneMainTemplate>
  )
}
