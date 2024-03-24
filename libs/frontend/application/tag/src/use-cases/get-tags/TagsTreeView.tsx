import type {
  ITagModel,
  ITagNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { type CheckedKeys, PageType } from '@codelab/frontend/abstract/types'
import {
  useStore,
  useTablePagination,
} from '@codelab/frontend/application/shared/store'
import { tagRef } from '@codelab/frontend/domain/tag'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import type { TreeProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TagsTreeItem } from './TagsTreeItem'

interface TagsTreeViewProps {
  showSearchBar: boolean
}

export const TagsTreeView = observer(({ showSearchBar }: TagsTreeViewProps) => {
  const { tagService } = useStore()

  const { data, filter, handleChange, isLoading } = useTablePagination<
    ITagModel,
    { name: string }
  >({
    filterTypes: { name: 'string' },
    paginationService: tagService.paginationService,
    pathname: PageType.Type,
  })

  /**
   * Need to wait for all item to be hydrated first, before we can access children ref
   */
  const treeData: Array<ITreeNode<ITagNodeData>> = isLoading
    ? []
    : data
        .filter((tag) => tag.isRoot)
        .map((tag) => ({
          children: tag.children.map((child) => child.current.treeNode),
          extraData: {
            node: tag,
            type: 'tag',
          },
          key: tag.id,
          primaryTitle: tag.name,
          secondaryTitle: tag.name,
          title: `${tag.name}`,
        }))

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (selectedKeys[0]) {
      tagService.tagDomainService.setSelectedTag(
        tagRef(selectedKeys[0].toString()),
      )
    }
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const { checked } = checkedKeys as CheckedKeys

    tagService.setCheckedTags(checked.map((check) => tagRef(check.toString())))
  }

  return (
    <CuiTree<ITreeNode<ITagNodeData>>
      checkStrictly
      checkable
      checkedKeys={tagService.checkedTags.map((checkedTag) => checkedTag.id)}
      expandedKeys={tagService.tagDomainService.expandedNodes}
      isLoading={isLoading}
      onCheck={onCheck}
      onExpand={(expandedKeys) => {
        tagService.tagDomainService.setExpandedNodes(
          expandedKeys.map((key) => key.toString()),
        )
      }}
      onSearchKeywordChange={(keyword) => {
        void handleChange({ newFilter: { name: keyword || undefined } })
      }}
      onSelect={onSelect}
      searcheable={
        showSearchBar
          ? {
              primaryTitle: true,
            }
          : false
      }
      titleRender={(node) => {
        return <TagsTreeItem data={node} />
      }}
      treeData={treeData}
    />
  )
})
