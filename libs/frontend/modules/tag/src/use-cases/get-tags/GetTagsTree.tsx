import { CheckedKeys } from '@codelab/frontend/abstract/types'
import { Tree, TreeProps } from 'antd'
import { useTagDispatch, useTagState, useTagTree } from '../../hooks'
import { useGetTagGraphsQuery } from '../../store'

export const GetTagsTree = () => {
  const { data, isLoading } = useGetTagGraphsQuery()
  const { setSelectedTag, setCheckedTags } = useTagDispatch()
  const { checkedTags } = useTagState()
  const tagTree = useTagTree(data?.getTagGraphs)

  if (!data) {
    return null
  }

  const tagTreesData = tagTree.getAntdTree()

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    setSelectedTag({ key: selectedKeys[0] })
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const { checked } = checkedKeys as CheckedKeys
    setCheckedTags({ keys: checked })
  }

  return (
    <Tree
      checkStrictly
      // defaultExpandedKeys={['0-0-0', '0-0-1']}
      // defaultSelectedKeys={['0-0-0', '0-0-1']}
      // defaultCheckedKeys={['0-0-0', '0-0-1']}
      checkable
      checkedKeys={checkedTags}
      onCheck={onCheck}
      onSelect={onSelect}
      /**
       * The root is a system root & shouldn't be shown
       */
      treeData={tagTreesData ? [tagTreesData] : undefined}
    />
  )
}
