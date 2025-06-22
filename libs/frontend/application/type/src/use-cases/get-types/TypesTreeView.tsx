'use client'

import type { ITreeViewProps } from '@codelab/frontend-abstract-application'
import type {
  ITreeNode,
  ITypeModel,
  ITypeTreeNodeData,
} from '@codelab/frontend-abstract-domain'

import { CuiTree } from '@codelab/frontend-presentation-codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { TypeKind } from '@codelab/shared-infra-gqlgen'

import { TypesTreeItem } from './TypesTreeItem'

export const TypesTreeView = ({
  data,
  handlePaginationChange,
  isLoading,
  searchParams,
  showSearchBar,
}: ITreeViewProps<ITypeModel>) => {
  const { typeDomainService } = useDomainStore()
  const { expandedKeys, pageSize, search, selectedKey } = searchParams

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
        // Ensure navigation persists selected key
        defaultSelectedKeys={selectedKey ? [selectedKey] : undefined}
        expandedKeys={expandedKeys}
        filter={
          showSearchBar
            ? {
                filterable: { primaryTitle: true },
                keyword: search || '',
              }
            : undefined
        }
        isLoading={isLoading}
        onExpand={(keys) => {
          typeDomainService.setExpandedNodes(keys.map((key) => key.toString()))
        }}
        onSearchKeywordChange={(newSearch) =>
          handlePaginationChange?.(1, pageSize, newSearch)
        }
        onSelect={(keys) => {
          if (keys[0]) {
            typeDomainService.setSelectedKey(keys[0].toString())
          }
        }}
        titleRender={(node) => {
          return <TypesTreeItem data={node} searchParams={searchParams} />
        }}
        treeData={treeData}
      />
    </div>
  )
}
