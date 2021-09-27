import { CheckedKeys } from '@codelab/frontend/shared/types'
import { Tree, TreeProps } from 'antd'
import { useTagState } from '../../domain/use-tag/useTagState'
import { useTagTrees } from '../../domain/use-tag/useTagTree'
import { useGetTagGraphsQuery } from '../get-tag-graphs'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagGraphsQuery()
  const { setSelectedTag, setCheckedTags, selectedTag } = useTagState()
  const tagTrees = useTagTrees(data?.getTagGraphs)

  if (!data) {
    return null
  }

  const tagTreesData = tagTrees.map((tagTree) => tagTree.getAntdTree())

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    setSelectedTag(selectedKeys[0])
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const { checked } = checkedKeys as CheckedKeys
    setCheckedTags(checked)
  }

  return (
    <Tree
      checkable
      // defaultExpandedKeys={['0-0-0', '0-0-1']}
      // defaultSelectedKeys={['0-0-0', '0-0-1']}
      // defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      checkStrictly
      /**
       * The root is a system root & shouldn't be shown
       */
      // treeData={tagTree.getAntdTree().children}
      treeData={tagTreesData}
      // treeData={tags.map((tag) => ({
      //   key: tag.id,
      //   title: tag.name,
      //   children: [],
      // }))}
    />
  )
}
