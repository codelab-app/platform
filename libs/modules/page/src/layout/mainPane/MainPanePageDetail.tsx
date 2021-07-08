import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  PageFullFragment,
  refetchGetPageQuery,
  useMovePageElementMutation,
} from '@codelab/codegen/graphql'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { MainPaneTemplate } from '@codelab/frontend/layout'
import {
  ActionType,
  CrudModal,
  ElementNode,
  EntityType,
  NodeBase,
  NodeLink,
  PageType,
} from '@codelab/frontend/shared'
import { Dropdown, Empty, Tree } from 'antd'
import { DataNode, TreeProps } from 'antd/lib/tree'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { usePageBuilderState } from '../../builder'
import {
  CreatePageElementButton,
  CreatePageElementForm,
} from '../../pageElement'
import { PageContext } from '../../providers'
import { ElementContextMenu } from './ElementContextMenu'

const Title = ({
  page,
  appId,
}: {
  page: PageFullFragment | undefined | null
  appId?: string
}) => {
  return (
    <div tw="flex flex-row items-center gap-x-4">
      <Link
        href={{
          pathname: PageType.PageList,
          query: { appId },
        }}
      >
        <ArrowLeftOutlined />
      </Link>
      <span>{page?.name}</span>
    </div>
  )
}

export const MainPanePageDetail = () => {
  const { cytoscapeRoot, page, loading, pageId } = useContext(PageContext)
  // Keeps track of the ids of expanded tree nodes
  const [expanded, setExpanded] = useState<Array<string | number>>([])

  const {
    selectPageElement,
    setHoveringPageElement,
    state: { selectedPageElement },
  } = usePageBuilderState()

  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  // When we select a element, expand all tree nodes from the root to the selected elements
  useEffect(() => {
    if (!selectedPageElement || !cytoscapeRoot) {
      return
    }

    // Create a set from the current expanded array, so we can check for duplicates
    const expandedSet = new Set(expanded)

    // Get the path of nodes from the root to the selected element using a*
    const pathResult = cytoscapeRoot.elements().aStar({
      root: `#${cytoscapeRoot.elements().roots().first().id()}`,
      directed: true,
      goal: `#${selectedPageElement.id}`,
    })

    // If there is a path (there should always be, it's a tree after all), go through each node
    // of the path and keep track of all nodes that need to get expanded
    if (pathResult.found) {
      // Those are the node ids that we need to expand
      const toExpand: Array<string> = []

      pathResult.path.forEach((node) => {
        // If the id is already expanded, don't add it again
        if (!expandedSet.has(node.id())) {
          toExpand.push(node.id())
        }
      })

      setExpanded((prevState) => [...prevState, ...toExpand])
    }
  }, [selectedPageElement])

  let tree: DataNode | null = null

  if (cytoscapeRoot) {
    tree = CytoscapeService.antdTree(cytoscapeRoot)
  }

  const getNodeById = (id: string) =>
    cytoscapeRoot?.elements().getElementById(id).first().data()

  const [movePageElement, { loading: movingPageElement }] =
    useMovePageElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: [
        refetchGetPageQuery({ input: { pageId: pageId as string } }),
      ],
    })

  const handleDrop: TreeProps['onDrop'] = (e) => {
    // This can be optimized to be handled in the API
    // It is also buggy, because it doesn't handle the case where the two nodes have the same order

    if (!cytoscapeRoot) {
      return
    }

    const dragNodeId = (e.dragNode as any as NodeBase).id
    const dropNodeId = (e.node as any as NodeBase).id

    console.log(e)

    if (e.dropToGap) {
      // Switch spots with the element next to the drop indicator
      const dragParentLink = cytoscapeRoot
        .edges(`[target = "${dragNodeId}"]`)
        .first()
        .data() as NodeLink

      const dropParentLink = cytoscapeRoot
        .edges(`[target = "${dropNodeId}"]`)
        .first()
        .data() as NodeLink

      const dropNodeParentId = dropParentLink.source
      const originalDragElementOrder = dragParentLink?.order
      movePageElement({
        variables: {
          input: {
            pageElementId: dragNodeId,
            moveData: {
              parentElementId: dropNodeParentId,
              order:
                dropParentLink.order == originalDragElementOrder
                  ? dropParentLink.order + 1
                  : dropParentLink.order,
            },
          },
        },
      })
      movePageElement({
        variables: {
          input: {
            pageElementId: dropNodeId,
            moveData: {
              parentElementId: dropNodeParentId,
              order: originalDragElementOrder,
            },
          },
        },
      })
    } else {
      // FIXME
      // Move the dragged element as a child to the dropped element
      // This is buggy, since e.dropPosition does not match our ordering system
      // it causes issues when moving elements up
      return movePageElement({
        variables: {
          input: {
            pageElementId: dragNodeId,
            moveData: {
              parentElementId: dropNodeId,
              order: e.dropPosition,
            },
          },
        },
      })
    }
  }

  return (
    <MainPaneTemplate
      title={<Title page={page} appId={page?.app?.id} />}
      header={
        <CreatePageElementButton
          loading={loading || movingPageElement}
          key={0}
        />
      }
      containerProps={{ onClick: () => setContextMenuNodeId(null) }}
    >
      {tree ? (
        <Tree
          className="draggable-tree"
          blockNode
          expandedKeys={expanded}
          draggable
          onExpand={(expandedKeys) => setExpanded(expandedKeys)}
          onDrop={handleDrop}
          selectedKeys={selectedPageElement ? [selectedPageElement.id] : []}
          onMouseEnter={({ node: dataNode }) => {
            const node = getNodeById((dataNode as any).id?.toString())

            if (!node) {
              return
            }

            setHoveringPageElement(node)
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => {
            setHoveringPageElement(null)
          }}
          onSelect={([id], { nativeEvent }) => {
            nativeEvent.stopPropagation()

            const node = getNodeById(id?.toString())

            if (!node) {
              return
            }

            selectPageElement(node)
          }}
          titleRender={(node) => {
            const label = (node as any as NodeBase).name
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
                      node={node as any as ElementNode}
                    />
                  </>
                }
                trigger={['contextMenu']}
              >
                <div>{label}</div>
              </Dropdown>
            )
          }}
          treeData={[tree]}
        />
      ) : loading ? null : (
        <Empty />
      )}

      <CrudModal
        entityType={EntityType.PageElement}
        actionType={ActionType.Create}
        okText={'Create'}
        renderForm={() => (
          <CreatePageElementForm
            initialParentElementId={selectedPageElement?.id}
          />
        )}
      />
    </MainPaneTemplate>
  )
}
