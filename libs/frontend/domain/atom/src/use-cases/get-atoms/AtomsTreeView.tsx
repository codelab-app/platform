import type { IAtom, IAtomsTreeDataNode } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AtomsTreeItem } from './AtomsTreeItem'
import { useGetLibrary } from './dataSource/atom-library'

interface AtomsTreeViewProps {
  showSearchBar: boolean
}

export const AtomsTreeView = observer(
  ({ showSearchBar }: AtomsTreeViewProps) => {
    const { atomService } = useStore()
    const getLibrary = useGetLibrary()

    const { data, filter, handleChange, isLoading } = useTablePagination<
      IAtom,
      { name: string }
    >({
      filterTypes: { name: 'string' },
      paginationService: atomService.paginationService,
      pathname: PageType.Atoms,
    })

    const treeData: Array<IAtomsTreeDataNode> = data.map((atom) => ({
      children: atom.api.current.fieldsTree,
      extraData: { node: atom, type: 'atom' },
      key: atom.id,
      primaryTitle: getLibrary(atom.type).name,
      secondaryTitle: atom.name,
    }))

    return (
      <div className="h-full w-full">
        <CuiTree<IAtomsTreeDataNode>
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
