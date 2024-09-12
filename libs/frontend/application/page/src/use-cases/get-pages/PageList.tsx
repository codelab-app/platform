import type {
  IAppModel,
  IPageNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { PageTreeItem } from './PageTreeItem'

interface PageListProps {
  app: IAppModel
}

export const PageList = observer(({ app }: PageListProps) => {
  const treeData: Array<ITreeNode<IPageNodeData>> = app.pages.map((page) => ({
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
