import { Empty, Tree } from 'antd'
import React, { useContext } from 'react'
import { AppContext, AtomType } from '@codelab/frontend/shared'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import {
  CytoscapeNodeType,
  CytoscapeService,
} from '@codelab/frontend/cytoscape'
import { DataNode } from 'antd/lib/tree'
import { useBuilderSelectionState } from '@codelab/frontend/builder'

export const PaneMainTree = () => {
  const { setSelected, setHovering } = useBuilderSelectionState()

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
            if ((node as any).nodeType === CytoscapeNodeType.PageElement) {
              setHovering((node as any).id)
            }
          }}
          onMouseLeave={({ node }) => {
            if ((node as any).nodeType === CytoscapeNodeType.PageElement) {
              setHovering(undefined)
            }
          }}
          onSelect={([id], { node }) => {
            if ((node as any).nodeType === CytoscapeNodeType.PageElement) {
              setSelected(id as string)
            } else {
              setSelected(undefined)
            }
          }}
          titleRender={(node) => {
            const label = (node as any).label
            const type = (node as any).nodeType

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
