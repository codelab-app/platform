'use client'

import type {
  IPaginationSearchParams,
  ITreeViewProps,
} from '@codelab/frontend/abstract/application'
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

export const TypesTreeView = observer<ITreeViewProps<ITypeModel>>(
  ({ data, isLoading, searchParams, showSearchBar }) => {
    const { search } = searchParams

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
          filter={
            showSearchBar
              ? {
                  filterable: { primaryTitle: true },
                  keyword: search || '',
                }
              : undefined
          }
          isLoading={isLoading}
          titleRender={(node) => {
            return <TypesTreeItem data={node} />
          }}
          treeData={treeData}
        />
      </div>
    )
  },
)
