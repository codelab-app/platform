import { useGetTagGraphQuery } from '@codelab/shared/codegen/graphql'
import { Tree, TreeProps } from 'antd'
import { useTagState } from '../../domain/use-tag/useTagState'
import { useTagTree } from '../../domain/use-tag/useTagTree'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagGraphQuery()
  const { setSelectedTag, setCheckedTags, selectedTag } = useTagState()
  const tagTree = useTagTree(data?.getTagGraph)

  if (!data) {
    return null
  }

  const tags = data.getTagGraph

  console.log(tags)
  console.log(tagTree.getAntdTree())

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    setSelectedTag(`${selectedKeys[0]}`)
  }

  const onCheck: TreeProps['onCheck'] = (checked, info) => {
    setCheckedTags(checked as Array<string>)
  }

  return (
    <Tree
      checkable
      // defaultExpandedKeys={['0-0-0', '0-0-1']}
      // defaultSelectedKeys={['0-0-0', '0-0-1']}
      // defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      /**
       * The root is a system root & shouldn't be shown
       */
      treeData={tagTree.getAntdTree().children}
      // treeData={tags.map((tag) => ({
      //   key: tag.id,
      //   title: tag.name,
      //   children: [],
      // }))}
    />
  )
}
