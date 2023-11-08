import type {
  IAppModel,
  IPagesTreeDataNode,
} from '@codelab/frontend/abstract/domain'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { PageTreeItem } from './PageTreeItem'

interface PageListProps {
  app: IAppModel
}

export const PageList = observer(({ app }: PageListProps) => {
  const treeData: Array<IPagesTreeDataNode> = app.pages.map((page) => ({
    extraData: {
      node: page.current,
      type: 'page',
    },
    key: page.current.slug,
    primaryTitle: page.current.name,
    title: page.current.slug,
  }))

  return (
    <CuiTree
      titleRender={(node) => {
        return <PageTreeItem app={app} data={node} />
      }}
      treeData={treeData}
    />
  )
})
