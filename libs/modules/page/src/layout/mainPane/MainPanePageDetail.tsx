import 'twin.macro'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { PageFullFragment } from '@codelab/codegen/graphql'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { MainPaneTemplate } from '@codelab/frontend/layout'
import {
  ActionType,
  CrudModal,
  ElementNode,
  EntityType,
  NodeBase,
  PageType,
} from '@codelab/frontend/shared'
import { Dropdown, Empty, Menu, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { usePageBuilderState, useSetPageBuilderState } from '../../builder'
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
  const { cytoscapeRoot, page, loading } = useContext(PageContext)
  const [expanded, setExpanded] = useState<Array<string | number>>([])
  const { reset } = useSetPageBuilderState()

  const {
    selectPageElement,
    setHoveringPageElement,
    state: { selectedPageElement },
  } = usePageBuilderState()

  useEffect(() => {
    if (!selectedPageElement || !cytoscapeRoot) {
      return
    }

    const expandedSet = new Set(expanded)

    const path = cytoscapeRoot.elements().aStar({
      root: `#${cytoscapeRoot.elements().roots().first().id()}`,
      directed: true,
      goal: `#${selectedPageElement.id}`,
    })

    if (path.found) {
      const toAdd: Array<string> = []
      path.path.forEach((node) => {
        if (!expandedSet.has(node.id())) {
          toAdd.push(node.id())
        }
      })

      setExpanded((e) => [...e, ...toAdd])
    }
  }, [selectedPageElement])

  let tree: DataNode | null = null

  if (cytoscapeRoot) {
    tree = CytoscapeService.antdTree(cytoscapeRoot)
  }

  const getNodeById = (id: string) =>
    cytoscapeRoot?.elements().getElementById(id).first().data()

  return (
    <MainPaneTemplate
      title={<Title page={page} appId={page?.app?.id} />}
      header={<CreatePageElementButton loading={loading} key={0} />}
      containerProps={{ onClick: () => reset() }}
    >
      {tree ? (
        <Tree
          className="draggable-tree"
          // defaultExpandedKeys={this.state.expandedKeys}
          blockNode
          expandedKeys={expanded}
          onExpand={(expandedKeys) => setExpanded(expandedKeys)}
          selectedKeys={selectedPageElement ? [selectedPageElement.id] : []}
          onMouseEnter={({ node: dataNode }) => {
            const node = getNodeById((dataNode as any).id.toString())

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

            const node = getNodeById(id.toString())

            if (!node) {
              return
            }

            selectPageElement(node)
          }}
          titleRender={(node) => {
            const label = (node as any as NodeBase).name

            return (
              <Dropdown
                overlay={
                  <ElementContextMenu node={node as any as ElementNode} />
                }
                trigger={['contextMenu']}
              >
                <span>{label}</span>
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
