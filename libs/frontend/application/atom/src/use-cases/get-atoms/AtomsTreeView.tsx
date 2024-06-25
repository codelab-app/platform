import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AtomsTreeItem } from './AtomsTreeItem'

interface AtomsTreeViewProps {
  showSearchBar: boolean
}

export const AtomsTreeView = observer(
  ({ showSearchBar }: AtomsTreeViewProps) => {
    const { atomService } = useStore()

    const { data, filter, handleChange, isLoading } = useTablePagination<
      IAtomModel,
      { name: string }
    >({
      filterTypes: { name: 'string' },
      paginationService: atomService.paginationService,
      pathname: PageType.Atoms,
    })

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
          onSearchKeywordChange={(keyword) =>
            handleChange({ newFilter: { name: keyword } })
          }
          searchKeyword={filter.name}
          searcheable={showSearchBar ? { primaryTitle: true } : false}
          titleRender={(node) => <AtomsTreeItem data={node} />}
          treeData={treeData}
        />
      </div>
    )
  },
)
