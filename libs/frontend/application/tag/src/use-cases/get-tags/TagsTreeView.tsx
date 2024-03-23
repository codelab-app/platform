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
import {
  CuiSkeletonWrapper,
  CuiTree,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAsync } from '@react-hookz/web'
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

  tagService.tagDomainService.tags.forEach((tag) => {
    tag.children.forEach((child) => {
      console.log(child.id)
    })
  })

  return null

  /**
   * Need to wait for all item to be hydrated first, before we can access children ref
   */
  const treeData: Array<ITreeNode<ITagNodeData>> = isLoading
    ? []
    : data
        .filter((tag) => tag.isRoot)
        .map((tag) => ({
          children: tag.children.map((child) => child.current.treeNode),
          // children: tag.children.map((child) => {
          //   // Get from tagService instead, since the ref here isn't set
          //   console.log(child)

          //   return child
          // }),
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
    selectedKeys[0] &&
      tagService.tagDomainService.setSelectedTag(
        tagRef(selectedKeys[0].toString()),
      )
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
      isLoading={isLoading}
      onCheck={onCheck}
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
