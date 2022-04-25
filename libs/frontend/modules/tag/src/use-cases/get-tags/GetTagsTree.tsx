import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { CheckedKeys } from '@codelab/frontend/abstract/types'
import { ITagGraphDTO } from '@codelab/shared/abstract/core'
import { Tree, TreeProps } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { tagRef } from '../../store'
import { TreeService } from '../../store/tree.service'

export const GetTagsTree = observer<WithServices<TAG_SERVICE>>(
  ({ tagService }) => {
    const [tree, setTree] = useState<Array<DataNode>>()

    useDeepCompareEffect(() => {
      tagService.getTagGraphs().then((response) => {
        const makeupResponse = response.map((tag: ITagGraphDTO) => ({
          id: tag.id,
          label: tag.name,
          children: tag.descendants,
          isRoot: tag.isRoot,
        }))

        const treeService = TreeService.init({ nodes: makeupResponse })
        const dataNode = TreeService.generateTreeDataNodes(treeService.roots)

        setTree(dataNode)
      })
    }, [tagService.tags])

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
  },
)
