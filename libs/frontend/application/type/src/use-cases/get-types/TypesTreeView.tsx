'use client'

import type {
  ITreeNode,
  ITypeModel,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { TypeKind } from '@codelab/shared/infra/gqlgen'
import { observer } from 'mobx-react-lite'

import { TypesTreeItem } from './TypesTreeItem'

interface TypesTreeViewProps {
  data: Array<ITypeModel>
  isLoading: boolean
  showSearchBar: boolean
}

export const TypesTreeView = observer<TypesTreeViewProps>(
  ({ data, isLoading, showSearchBar }) => {
    const { routerService } = useApplicationStore()

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
            routerService.setSearchParams({
              ...routerService.searchParams,
              search: keyword,
            })
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
