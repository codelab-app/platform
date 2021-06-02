import 'twin.macro'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { MainPaneTemplate } from '@codelab/frontend/layout'
import {
  ActionType,
  AtomType,
  CrudModal,
  EntityType,
  NodeBase,
  PageElementNode,
  PageType,
} from '@codelab/frontend/shared'
import { PageFullFragment } from '@codelab/graphql'
import { Empty, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import Link from 'next/link'
import React, { useContext } from 'react'
import { usePageBuilderState } from '../../builder'
import {
  CreatePageElementButton,
  CreatePageElementForm,
} from '../../pageElement'
import { PageContext } from '../../providers'

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
  const { selectPageElement } = usePageBuilderState()
  let tree: DataNode | null = null

  if (cytoscapeRoot) {
    tree = CytoscapeService.antdTree(cytoscapeRoot)
  }

  const onDrop = ({ dragNode, node: targetNode }: any) => {
    // Disable drag
    if (dragNode.type !== AtomType.ReactRglItem) {
      console.log(dragNode.id, targetNode.id)
    }
  }

  return (
    <MainPaneTemplate
      title={<Title page={page} appId={page?.app?.id} />}
      header={<CreatePageElementButton loading={loading} key={0} />}
    >
      {tree ? (
        <Tree
          className="draggable-tree"
          // defaultExpandedKeys={this.state.expandedKeys}
          blockNode
          onMouseEnter={({ node }) => {
            // setHovering((node as any as NodeBase).id)
          }}
          onMouseLeave={() => {
            // resetHovering()
          }}
          onSelect={([id], { node }) => {
            selectPageElement(node as any as PageElementNode)
          }}
          titleRender={(node) => {
            const label = (node as any as NodeBase).name

            return <>{label}</>
          }}
          onDrop={onDrop}
          treeData={[tree]}
        />
      ) : loading ? null : (
        <Empty />
      )}

      <CrudModal
        entityType={EntityType.PageElement}
        actionType={ActionType.Create}
        okText={'Create'}
        renderForm={() => <CreatePageElementForm />}
      />
    </MainPaneTemplate>
  )
}
