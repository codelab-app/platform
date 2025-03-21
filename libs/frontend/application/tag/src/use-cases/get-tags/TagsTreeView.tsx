'use client'

import type {
  ITagModel,
  ITagNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { TreeProps } from 'antd'

import { type CheckedKeys } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { useTagService } from '../../services'
import { TagsTreeItem } from './TagsTreeItem'

interface TagsTreeViewProps {
  data: Array<ITagModel>
  isLoading: boolean
  showSearchBar: boolean
}

export const TagsTreeView = observer<TagsTreeViewProps>(
  ({ data, isLoading, showSearchBar }) => {
    const tagService = useTagService()
    const { routerService } = useApplicationStore()
    const { tagDomainService } = useDomainStore()

    /**
     * Need to wait for all item to be hydrated first, before we can access children ref
     */
    const treeData: Array<ITreeNode<ITagNodeData>> = data
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
          routerService.setSearchParams({
            ...routerService.searchParams,
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
  },
)
