import { PureQueryOptions } from '@apollo/client'
import { ElementTree } from '@codelab/frontend/abstract/props'
import { useBuilder } from '@codelab/frontend/modules/builder'
import { useMoveElementMutation } from '@codelab/shared/codegen/graphql'
import { Dropdown, Tree } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { MainPaneTemplate, MainPaneTemplateProps } from '../MainPaneTemplate'
import { ElementContextMenu } from './ElementContextMenu'
import { useExpandedNodes } from './useExpandedNodes'

export interface MainPaneBuilderTemplateProps extends MainPaneTemplateProps {
  tree: ElementTree
  moveElementRefetchQueries?: Array<PureQueryOptions>
}

export const MainPaneBuilderTemplate = ({
  tree,
  moveElementRefetchQueries,
  children,
  ...props
}: MainPaneBuilderTemplateProps) => {
  const {
    setHoveringElement,
    setSelectedElement,
    reset,
    state: { selectedElement },
  } = useBuilder()

  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(
    selectedElement,
    tree,
  )

  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const antdTree = tree.getAntdTree()

  const [moveElement, { loading: isLoadingMoveElement }] =
    useMoveElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: moveElementRefetchQueries,
    })

  const handleDrop: TreeProps['onDrop'] = (e) => {
    // This can be optimized to be handled in the API
    // It is also buggy, because it doesn't handle the case where the two nodes have the same order

    const dragNodeId = (e.dragNode as any).id
    const dropNodeId = (e.node as any).id

    if (e.dropToGap) {
      // Switch spots with the element next to the drop indicator

      const dropNodeParentId = tree.getParent(dropNodeId)?.id
      const dropElementOrder = tree.getOrderInParent(dropNodeId)
      const originalDragElementOrder = tree.getOrderInParent(dragNodeId)

      if (dropNodeParentId) {
        moveElement({
          variables: {
            input: {
              elementId: dragNodeId,
              moveData: {
                parentElementId: dropNodeParentId,
                order:
                  dropElementOrder === originalDragElementOrder
                    ? dropElementOrder + 1
                    : dropElementOrder,
              },
            },
          },
        }).catch(console.error)

        moveElement({
          variables: {
            input: {
              elementId: dropNodeId,
              moveData: {
                parentElementId: dropNodeParentId,
                order: originalDragElementOrder,
              },
            },
          },
        }).catch(console.error)
      }
    } else {
      // FIXME
      // Move the dragged element as a child to the dropped element
      // This is buggy, since e.dropPosition does not match our ordering system
      // it causes issues when moving elements up
      return moveElement({
        variables: {
          input: {
            elementId: dragNodeId,
            moveData: {
              parentElementId: dropNodeId,
              order: e.dropPosition,
            },
          },
        },
      })
    }

    return void 0
  }

  return (
    <MainPaneTemplate
      {...props}
      containerProps={{
        onClick: () => {
          setContextMenuNodeId(null)
        },
      }}
    >
      <div style={{ height: '100%' }} onClick={() => reset()}>
        {tree ? (
          <Tree
            disabled={isLoadingMoveElement}
            className="draggable-tree"
            blockNode
            expandedKeys={expandedNodeIds}
            draggable
            onExpand={(expandedKeys) => setExpandedNodeIds(expandedKeys)}
            onDrop={handleDrop}
            selectedKeys={selectedElement ? [selectedElement.id] : []}
            onMouseEnter={({ node: dataNode }) => {
              const element = tree.getElementById(
                (dataNode as any).id?.toString(),
              )

              setHoveringElement(element)
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => {
              setHoveringElement(null)
            }}
            onSelect={([id], { nativeEvent }) => {
              nativeEvent.stopPropagation()

              const element = tree.getElementById(id?.toString())
              setSelectedElement(element)
            }}
            titleRender={(node) => {
              const label = (node as any).name
              const nodeId = (node as any).id

              return (
                <Dropdown
                  onVisibleChange={() => setContextMenuNodeId(nodeId)}
                  visible={contextMenuItemId === nodeId}
                  overlay={
                    <>
                      <div
                        css={tw`fixed inset-0`}
                        onClick={(e) => {
                          setContextMenuNodeId(null)
                          e.stopPropagation()
                        }}
                      />
                      <ElementContextMenu
                        // We need to manually hide the context menu, otherwise it stays open
                        onClick={() => setContextMenuNodeId(null)}
                        element={node as any}
                      />
                    </>
                  }
                  trigger={['contextMenu']}
                >
                  <div>{label}</div>
                </Dropdown>
              )
            }}
            treeData={[antdTree]}
          />
        ) : null}

        {children}
      </div>
    </MainPaneTemplate>
  )
}
