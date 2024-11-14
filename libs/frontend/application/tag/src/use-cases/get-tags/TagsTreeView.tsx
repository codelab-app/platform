'use client'

import type {
  ITagModel,
  ITagNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { TreeProps } from 'antd'

import { type CheckedKeys, PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { useTagService } from '../../services'
import { TagsTreeItem } from './TagsTreeItem'

interface TagsTreeViewProps {
  showSearchBar: boolean
}

export const TagsTreeView = observer(({ showSearchBar }: TagsTreeViewProps) => {
  const tagService = useTagService()
  const { routerService } = useApplicationStore()
  const { getDataFn, paginationService } = tagService
  const { tagDomainService } = useDomainStore()

  const { data, isLoading } = useTablePagination<ITagModel>({
    getDataFn,
    paginationService,
    pathname: PageType.Tags(),
    routerService,
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

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    if (selectedKeys[0]) {
      tagDomainService.setSelectedTag(tagRef(selectedKeys[0].toString()))
    }
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    const { checked } = checkedKeys as CheckedKeys

    tagService.setCheckedTagIds(checked)
  }

  return (
    <CuiTree<ITreeNode<ITagNodeData>>
      checkStrictly
      checkable
      checkedKeys={tagService.checkedTagIds}
      expandedKeys={tagDomainService.expandedNodes}
      isLoading={isLoading}
      onCheck={onCheck}
      onExpand={(expandedKeys) => {
        tagDomainService.setExpandedNodes(
          expandedKeys.map((key) => key.toString()),
        )
      }}
      onSearchKeywordChange={(keyword) => {
        routerService.setQueryParams({
          ...routerService.queryParams,
          search: keyword,
        })
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
