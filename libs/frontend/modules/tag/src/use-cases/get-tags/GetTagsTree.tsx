import { CheckedKeys } from '@codelab/frontend/shared/types'
import { Tree, TreeProps } from 'antd'
import { useTagState } from '../../domain/use-tag/useTagState'
import { useTagTree } from '../../domain/use-tag/useTagTree'
import { useGetTagGraphsQuery } from '../tag.endpoints'

export const GetTagsTree = () => {
  const { data, isLoading } = useGetTagGraphsQuery()
  const { setSelectedTag, setCheckedTags, selectedTag } = useTagState()
  const tagTree = useTagTree(data?.getTagGraphs)

  if (!data) {
    return null
  }

  // const tagTreesData = tagTree.map((tagTree) => tagTree.getAntdTree())

  console.log(tagTree.getAntdTree())

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
      treeData={[]}
      // treeData={tagTreesData}
      // treeData={tags.map((tag) => ({
      //   key: tag.id,
      //   title: tag.name,
      //   children: [],
      // }))}
    />
  )
}
