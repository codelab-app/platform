import { IElement } from '@codelab/frontend/abstract/core'
import {
  CreateElementModal,
  useElementGraphContext,
  useMoveElementMutation,
} from '@codelab/frontend/modules/element'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import {
  MainPaneTemplate,
  MainPaneTemplateProps,
} from '@codelab/frontend/view/templates'
import { ElementTree } from '@codelab/shared/core'
import { Dropdown, Tree as AntdTree } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import tw from 'twin.macro'
import { useBuilderSelection } from '../containers/builderState'
import { ElementContextMenu } from './ElementContextMenu'
import { useExpandedNodes } from './useExpandedNodes'

export type MainPaneBuilderTemplateProps = MainPaneTemplateProps

/**
 * Reusable builder pane, which renders an Antd tree for visualizing the DOM tree
 */
export const MainPaneBuilder = ({
  children,
  ...props
}: MainPaneBuilderTemplateProps) => {
  const { elementTree, elementId } = useElementGraphContext()
  const tree = elementTree ?? new ElementTree({ edges: [], vertices: [] })

  const {
    setHoveringElement,
    setSelectedElement,
    resetSelection,
    state: { selectedElement },
  } = useBuilderSelection()

  const { openDeleteModal } = useCrudModalForm(EntityType.Element)
  useHotkeys(
    'del,backspace',
    () => {
      if (selectedElement) {
        openDeleteModal([selectedElement.id], selectedElement)
      }
    },
    { enabled: !!selectedElement },
    [selectedElement],
  )
  useHotkeys(
    'esc',
    () => {
      if (selectedElement) {
        setSelectedElement(undefined)
      }
    },
    { enabled: !!selectedElement },
    [selectedElement],
  )

  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(
    tree,
    selectedElement,
  )

  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const antdTree = tree.getAntdTree()

  const [moveElement, { isLoading: isLoadingMoveElement }] =
    useMoveElementMutation()

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
      <div onClick={() => resetSelection()}>
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
              const element = node as any as IElement
              const label = element.name
              const nodeId = element.id
              const atomName = element.atom?.name || element.atom?.type

              return (
                <div data-cy={`atom-${label}`}>
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
                        <span css={tw`text-gray-400 text-xs`}>
                          ({atomName})
                        </span>
                      )}
                    </div>
                  </Dropdown>
                </div>
              )
            }}
            treeData={antdTree ? [antdTree] : undefined}
          />
        ) : null}

        <CreateElementModal
          formProps={{ initialData: { parentElementId: selectedElement?.id } }}
        />

        {children}
      </div>
    </MainPaneTemplate>
  )
}
