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
import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { TypeKind } from '@codelab/shared/infra/gqlgen'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { type Key, useCallback } from 'react'

import { TypesTreeItem } from './TypesTreeItem'
import { useUpdateSearchParams } from './useUpdateSearchParams.hook'

export const TypesTreeView = ({
  data,
  isLoading,
  searchParams: { expandedNodes, search, selectedKey },
  showSearchBar,
}: ITreeViewProps<ITypeModel>) => {
  const { updateSearchParams } = useUpdateSearchParams()

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

  console.log('selectedKey', selectedKey)

  return (
    <div className="size-full">
      <CuiTree<ITreeNode<ITypeTreeNodeData>>
        // Ensure navigation persists selected key
        defaultSelectedKeys={selectedKey ? [selectedKey] : undefined}
        expandedKeys={expandedNodes}
        filter={
          showSearchBar
            ? {
                filterable: { primaryTitle: true },
                keyword: search || '',
              }
            : undefined
        }
        isLoading={isLoading}
        onExpand={(expandedKeys) => {
          updateSearchParams(expandedKeys)
        }}
        titleRender={(node) => {
          return <TypesTreeItem data={node} />
        }}
        treeData={treeData}
      />
    </div>
  )
}
