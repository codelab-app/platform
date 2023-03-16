import type { ITagService } from '@codelab/frontend/abstract/core'
import type { CheckedKeys } from '@codelab/frontend/abstract/types'
import { Spinner } from '@codelab/frontend/view/components'
import { useAsync } from '@react-hookz/web'
import type { TreeProps } from 'antd'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { tagRef } from '../../store'

export const GetTagsTree = observer<{ tagService: ITagService }>(
  ({ tagService }) => {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
      selectedKeys[0] &&
        tagService.setSelectedTag(tagRef(selectedKeys[0].toString()))
    }

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
      const { checked } = checkedKeys as CheckedKeys

      tagService.setCheckedTags(
        checked.map((check) => tagRef(check.toString())),
      )
    }

    const [{ status }] = useAsync(() => tagService.getAll())

    return (
      <Spinner isLoading={status === 'loading'}>
        <Tree
          checkStrictly
          checkable
          checkedKeys={tagService.checkedTags.map(
            (checkedTag) => checkedTag.id,
          )}
          disabled={status === 'loading'}
          onCheck={onCheck}
          onSelect={onSelect}
          treeData={tagService.treeService.antdTreeData}
        />
      </Spinner>
    )
  },
)
