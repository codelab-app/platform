import { IElement } from '@codelab/frontend/abstract/core'
import {
  CreateElementModal,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import {
  MainPaneTemplate,
  MainPaneTemplateProps,
} from '@codelab/frontend/view/templates'
import { Dropdown, Tree as AntdTree } from 'antd'
import { DataNode } from 'rc-tree/lib/interface'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import tw from 'twin.macro'
import { builderActions } from '../store/builderState'
import { useBuilderSelectedElement } from '../store/useBuilderSelectedElement'
import { ElementContextMenu } from './ElementContextMenu'
import { useElementTreeDrop } from './useElementTreeDrop'
import { useExpandedNodes } from './useExpandedNodes'

export type MainPaneBuilderTemplateProps = MainPaneTemplateProps

/**
 * Base builder pane, which renders an Antd tree for visualizing the DOM tree
 * Requires ElementGraphContext
 */
export const MainPaneBuilder = ({
  children,
  ...props
}: MainPaneBuilderTemplateProps) => {
  const { elementTree } = useElementGraphContext()
  const { selectedElement } = useBuilderSelectedElement()
  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(elementTree)
  const antdTree = elementTree.getAntdTree()
  const { isMoving, handleDrop } = useElementTreeDrop(elementTree)
  const dispatch = useDispatch()
  const resetSelection = () => dispatch(builderActions.resetSelection)

  const setHoveringElement = (elementId?: string) =>
    dispatch(builderActions.hoverElement({ elementId }))

  const setSelectedElement = (elementId?: string) =>
    dispatch(builderActions.selectElement({ elementId }))

  return (
    <MainPaneTemplate
      {...props}
      containerProps={{
        style: { width: '100%', height: '100%' },
      }}
    >
      <div onClick={() => resetSelection()}>
        {elementTree ? (
          <AntdTree
            disabled={isMoving}
            className="draggable-tree"
            blockNode
            expandedKeys={expandedNodeIds}
            draggable
            onExpand={(expandedKeys) => setExpandedNodeIds(expandedKeys)}
            onDrop={handleDrop}
            selectedKeys={selectedElement ? [selectedElement.id] : []}
            onMouseEnter={({ node: { id } }: any) => setHoveringElement(id)}
            onMouseLeave={() => setHoveringElement(undefined)}
            onClick={(e) => e.stopPropagation()}
            onSelect={([id], { nativeEvent }) => {
              nativeEvent.stopPropagation()
              setSelectedElement(id?.toString())
            }}
            titleRender={(node) => <TreeItemTitle node={node} />}
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

const TreeItemTitle = ({ node }: { node: DataNode }) => {
  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const element = node as any as IElement
  const { name: label, id: nodeId, atom } = element
  const atomName = atom?.name || atom?.type

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
            <span css={tw`text-gray-400 text-xs`}>({atomName})</span>
          )}
        </div>
      </Dropdown>
    </div>
  )
}
