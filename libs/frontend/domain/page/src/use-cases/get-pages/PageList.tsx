import type { IApp, IPagesTreeDataNode } from '@codelab/frontend/abstract/core'
import { CuiTree } from '@codelab/frontend/presentation//codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { PageTreeItem } from './PageTreeItem'

interface PageListProps {
  app: IApp
}

export const PageList = observer(({ app }: PageListProps) => {
  const pages = app.pages.map((page) => page.current)

  const treeData: Array<IPagesTreeDataNode> = pages.map((page) => ({
    extraData: {
      node: page,
      type: 'page',
    },
    key: page.slug,
    primaryTitle: page.name,
    title: page.slug,
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
