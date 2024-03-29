import type {
  ITreeNode,
  ITypeModel,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useStore,
  useTablePagination,
} from '@codelab/frontend/application/shared/store'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TypesTreeItem } from './TypesTreeItem'

interface TypesTreeViewProps {
  showSearchBar: boolean
}

export const TypesTreeView = observer(
  ({ showSearchBar }: TypesTreeViewProps) => {
    const { typeService } = useStore()

    const { data, filter, handleChange, isLoading } = useTablePagination<
      ITypeModel,
      { name: string }
    >({
      filterTypes: { name: 'string' },
      paginationService: typeService.paginationService,
      pathname: PageType.Type,
    })

    const treeData: Array<ITreeNode<ITypeTreeNodeData>> = data.map((type) => ({
      children:
        type.kind === TypeKind.InterfaceType ? type.fieldsTree : undefined,
      extraData: {
        node: type,
        type: 'type',
      },
      key: type.id,
      primaryTitle: type.name,
      secondaryTitle: type.kind,
      title: `${type.name} (${type.kind})`,
    }))

    return (
      <div className="size-full">
        <CuiTree<ITreeNode<ITypeTreeNodeData>>
          isLoading={isLoading}
          onSearchKeywordChange={(keyword) => {
            void handleChange({ newFilter: { name: keyword || undefined } })
          }}
          searchKeyword={filter.name}
          searcheable={
            showSearchBar
              ? {
                  primaryTitle: true,
                }
              : false
          }
          titleRender={(node) => {
            return <TypesTreeItem data={node} />
          }}
          treeData={treeData}
        />
      </div>
    )
  },
)
