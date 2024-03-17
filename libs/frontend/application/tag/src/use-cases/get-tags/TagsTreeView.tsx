import type { ITagNodeData, ITreeNode } from '@codelab/frontend/abstract/domain'
import type { CheckedKeys } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { tagRef } from '@codelab/frontend/domain/tag'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAsync } from '@react-hookz/web'
import type { TreeProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TagsTreeItem } from './TagsTreeItem'

export const TagsTreeView = observer(() => {
  const { tagService } = useStore()

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

  const [{ status }] = useAsync(() => tagService.getAll())

  return (
    <CuiSkeletonWrapper isLoading={status === 'loading'}>
      <CuiTree<ITreeNode<ITagNodeData>>
        checkStrictly
        checkable
        checkedKeys={tagService.checkedTags.map((checkedTag) => checkedTag.id)}
        disabled={status === 'loading'}
        onCheck={onCheck}
        onSelect={onSelect}
        titleRender={(node) => {
          return <TagsTreeItem data={node} />
        }}
        treeData={tagService.treeService.antdTreeData}
      />
    </CuiSkeletonWrapper>
  )
})
