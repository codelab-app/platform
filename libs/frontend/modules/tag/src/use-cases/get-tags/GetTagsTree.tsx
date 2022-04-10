import { CheckedKeys } from '@codelab/frontend/abstract/types'
import { Tree, TreeProps } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { WithTagService } from '../../store'
import { tagRef } from '../../store/tag.model'
import { TreeService } from '../../store/tree.service'

export const GetTagsTree = observer<WithTagService>(({ tagService }) => {
  const [tree, setTree] = useState<Array<DataNode>>()

  useDeepCompareEffect(() => {
    tagService.getTagGraphs().then((response) => {
      const makeupResponse = response.map((tag) => ({
        id: tag.id,
        label: tag.name,
        children: tag.descendants,
        isRoot: tag.isRoot,
      }))

      const treeService = TreeService.init({ nodes: makeupResponse })
      const dataNode = TreeService.generateTreeDataNodes(treeService.roots)

      setTree(dataNode)
    })
  }, [tagService.tagsList])

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    tagService.setSelectedTag(tagRef(selectedKeys[0] as string))
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const { checked } = checkedKeys as CheckedKeys
    tagService.setCheckedTags(checked.map((check) => tagRef(check as string)))
  }

  return (
    <Tree
      checkStrictly
      checkable
      checkedKeys={tagService.checkedTags.map((checkedTag) => checkedTag.id)}
      onCheck={onCheck}
      onSelect={onSelect}
      treeData={tree}
    />
  )
})
