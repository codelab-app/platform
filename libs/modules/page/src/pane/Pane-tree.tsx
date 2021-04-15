import { Empty, Tree } from 'antd'
import React, { useContext } from 'react'
import { AppContext, AtomType } from '@codelab/frontend/shared'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { DataNode } from 'antd/lib/tree'
import { useBuilderSelectionState } from '@codelab/frontend/builder'

export const PaneMainTree = () => {
  const { setSelected, setHovering, resetHovering } = useBuilderSelectionState()

  const { page } = useContext(AppContext)

  let data: DataNode | undefined

  if (page && page.elements && page.elements.length) {
    const cy = CytoscapeService.fromPage(page)
    data = CytoscapeService.antdTree(cy)
  }

  const onDrop = ({ dragNode, node: targetNode }: any) => {
    // Disable drag
    if (dragNode.type !== AtomType.ReactRglItem) {
      console.log(dragNode.id, targetNode.id)
    }
  }

  return (
    <PaneMainTemplate title="Tree">
      {data ? (
        <Tree
          className="draggable-tree"
          // defaultExpandedKeys={this.state.expandedKeys}
          blockNode
          onMouseEnter={({ node }) => {
            setHovering({
              pageElementId: (node as any).pageElementId,
              componentElementId: (node as any).componentElementId,
              nodeId: (node as any).id,
            })
          }}
          onMouseLeave={({ node }) => {
            resetHovering()
          }}
          onSelect={([id], { node }) => {
            setSelected({
              pageElementId: (node as any).pageElementId,
              componentElementId: (node as any).componentElementId,
              nodeId: (node as any).id,
            })
          }}
          titleRender={(node) => {
            const label = (node as any).label
            const type = (node as any).type

            return (
              <>
                {label}{' '}
                <span
                  style={{
                    color: '#787878',
                    fontWeight: 'lighter',
                    fontSize: '0.6rem',
                  }}
                >
                  ({type})
                </span>
              </>
            )
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
