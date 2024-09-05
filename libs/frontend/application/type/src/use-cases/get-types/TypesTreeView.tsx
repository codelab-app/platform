'use client'

import type {
  ITreeNode,
  ITypeModel,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { TypeKind } from '@codelab/shared/infra/gql'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useTypeService } from '../../services'
import { TypesTreeItem } from './TypesTreeItem'

interface TypesTreeViewProps {
  showSearchBar: boolean
}

export const TypesTreeView = observer(
  ({ showSearchBar }: TypesTreeViewProps) => {
    const { routerService } = useApplicationStore()
    const { getDataFn, paginationService } = useTypeService()

    const { data, isLoading } = useTablePagination<ITypeModel>({
      getDataFn,
      paginationService,
      pathname: PageType.Type(),
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
            routerService.setQueryParams({ search: keyword })
          }}
          searchKeyword={routerService.search}
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
