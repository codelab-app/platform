'use client'

import type {
  IPaginationSearchParams,
  ITreeViewProps,
} from '@codelab/frontend/abstract/application'
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

export const TagsTreeView = observer<ITreeViewProps<ITagModel>>(
  ({ data, isLoading, searchParams, showSearchBar }) => {
    const tagService = useTagService()
    const { search } = searchParams
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
        filter={
          showSearchBar
            ? {
                filterable: { primaryTitle: true },
                keyword: search || '',
              }
            : undefined
        }
        isLoading={isLoading}
        onCheck={onCheck}
        onExpand={(expandedKeys) => {
          tagDomainService.setExpandedNodes(
            expandedKeys.map((key) => key.toString()),
          )
        }}
        onSelect={onSelect}
        titleRender={(node) => {
          return <TagsTreeItem data={node} />
        }}
        treeData={treeData}
      />
    )
  },
)
