import {
  refetchGetPageQuery,
  useMoveElementMutation,
} from '@codelab/codegen/graphql'
import { MainPaneTemplate } from '@codelab/frontend/layout'
import {
  ActionType,
  CrudModal,
  EntityType,
  PageType,
} from '@codelab/frontend/shared'
import { CreateElementButton } from '@codelab/modules/element'
import { Dropdown, Empty, Tree } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import tw from 'twin.macro'
import { usePageBuilderState } from '../../builder'
import { CreatePageElementForm } from '../../pageElement/createPageElement'
import { PageContext } from '../../providers'
import { ElementContextMenu } from './ElementContextMenu'
import { useMainPanePageDetailExpandedNodes } from './useMainPanePageDetailExpandedNodes'

export const MainPanePageDetail = () => {
  const { tree, page, loading, pageId } = useContext(PageContext)
  const router = useRouter()
  const appId = router.query.appId as string

  const {
    selectPageElement,
    setHoveringPageElement,
    state: { selectedElement },
  } = usePageBuilderState()

  const { setExpandedNodeIds, expandedNodeIds } =
    useMainPanePageDetailExpandedNodes(selectedElement, tree)

  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const antdTree = tree.getAndTree()

  const [movePageElement, { loading: movingPageElement }] =
    useMoveElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: [
        refetchGetPageQuery({ input: { pageId: pageId as string } }),
      ],
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
        movePageElement({
          variables: {
            input: {
              elementId: dragNodeId,
              moveData: {
                parentElementId: dropNodeParentId,
                order:
                  dropElementOrder == originalDragElementOrder
                    ? dropElementOrder + 1
                    : dropElementOrder,
              },
            },
          },
        }).catch(console.error)

        movePageElement({
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
      return movePageElement({
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
      title={page.name}
      headerProps={{
        onBack: () =>
          router.push({
            pathname: PageType.PageList,
            query: { appId },
          }),
      }}
      header={
        <CreateElementButton loading={loading || movingPageElement} key={0} />
      }
      containerProps={{ onClick: () => setContextMenuNodeId(null) }}
    >
      {tree ? (
        <Tree
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

            setHoveringPageElement(element)
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => {
            setHoveringPageElement(null)
          }}
          onSelect={([id], { nativeEvent }) => {
            nativeEvent.stopPropagation()

            const element = tree.getElementById(id?.toString())
            selectPageElement(element)
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
      ) : loading ? null : (
        <Empty />
      )}

      <CrudModal
        entityType={EntityType.Element}
        actionType={ActionType.Create}
        okText={'Create'}
        renderForm={() => (
          <CreatePageElementForm
            initialData={{ parentElementId: selectedElement?.id }}
          />
        )}
      />
    </MainPaneTemplate>
  )
}
