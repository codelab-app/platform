import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { AtomsTreeItem } from './AtomsTreeItem'

interface AtomsTreeViewProps {
  data: Array<IAtomModel>
  isLoading: boolean
  showSearchBar: boolean
}

export const AtomsTreeView = observer(
  ({ data, isLoading, showSearchBar }: AtomsTreeViewProps) => {
    const { routerService } = useApplicationStore()

    const treeData: Array<ITreeNode<IAtomTreeNodeData>> = data.map((atom) => ({
      children: atom.api.current.fieldsTree,
      extraData: { node: atom, type: 'atom' },
      key: atom.id,
      primaryTitle: atom.library.name,
      secondaryTitle: atom.name,
    }))

    return (
      <div className="size-full">
        <CuiTree<ITreeNode<IAtomTreeNodeData>>
          isLoading={isLoading}
          onSearchKeywordChange={(keyword) => {
            routerService.setSearchParams({
              ...routerService.searchParams,
              search: keyword,
            })
          }}
          searchKeyword={routerService.search}
          searcheable={showSearchBar ? { primaryTitle: true } : false}
          selectedKeys={routerService.node ? [routerService.node] : []}
          titleRender={(node) => <AtomsTreeItem data={node} />}
          treeData={treeData}
        />
      </div>
    )
  },
)

AtomsTreeView.displayName = 'AtomsTreeView'
