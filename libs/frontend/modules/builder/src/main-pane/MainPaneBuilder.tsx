import { PureQueryOptions } from '@apollo/client'
import { useMoveElementMutation } from '@codelab/frontend/modules/element'
import {
  MainPaneTemplate,
  MainPaneTemplateProps,
} from '@codelab/frontend/view/templates'
import { IElementVertex } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { Dropdown, Tree as AntdTree } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { useBuilder } from '../containers/useBuilder'
import { ElementContextMenu } from './ElementContextMenu'
import { useExpandedNodes } from './useExpandedNodes'

export interface MainPaneBuilderTemplateProps extends MainPaneTemplateProps {
  tree: ElementTree<any, any, any>
  moveElementRefetchQueries?: Array<PureQueryOptions>
}

export const MainPaneBuilder = ({
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
    tree,
    selectedElement,
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

      const dropNodeParentId = tree.getParentOf(dropNodeId)?.id
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
        style: { width: '100%', height: '100%' },
        onClick: () => {
          setContextMenuNodeId(null)
        },
      }}
    >
      <div onClick={() => reset()}>
        {tree ? (
          <AntdTree
            disabled={isLoadingMoveElement}
            className="draggable-tree"
            blockNode
            expandedKeys={expandedNodeIds}
            draggable
            onExpand={(expandedKeys) => setExpandedNodeIds(expandedKeys)}
            onDrop={handleDrop}
            selectedKeys={selectedElement ? [selectedElement.id] : []}
            onMouseEnter={({ node: dataNode }) => {
              const element = tree.getVertex((dataNode as any).id?.toString())

              setHoveringElement(element)
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => {
              setHoveringElement(undefined)
            }}
            onSelect={([id], { nativeEvent }) => {
              nativeEvent.stopPropagation()

              const element = tree.getVertex(id?.toString())
              setSelectedElement(element)
            }}
            titleRender={(node) => {
              const element = node as any as IElementVertex
              const label = element.name
              const nodeId = element.id
              const atomName = element.atom?.name || element.atom?.type

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
                  <div>
                    {label}{' '}
                    {atomName && (
                      <span css={tw`text-gray-400 text-xs`}>({atomName})</span>
                    )}
                  </div>
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
