import type { NameFilter } from '@codelab/frontend/abstract/application'
import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import {
  useSearchQuery,
  useTablePagination,
} from '@codelab/frontend-application-shared-store/pagination'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useAtomService } from '../../services'
import { AtomsTreeItem } from './AtomsTreeItem'

interface AtomsTreeViewProps {
  showSearchBar: boolean
}

export const AtomsTreeView = observer(
  ({ showSearchBar }: AtomsTreeViewProps) => {
    const { paginationService } = useAtomService()
    const { filterables } = useSearchQuery<NameFilter>(useSearchParams())

    const { data, isLoading } = useTablePagination<IAtomModel, NameFilter>({
      filterables,
      paginationService,
      pathname: PageType.Atoms(),
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
            paginationService.setFilter({ name: keyword })
          }
          searchKeyword={filterables.name}
          searcheable={showSearchBar ? { primaryTitle: true } : false}
          titleRender={(node) => <AtomsTreeItem data={node} />}
          treeData={treeData}
        />
      </div>
    )
  },
)

AtomsTreeView.displayName = 'AtomsTreeView'
