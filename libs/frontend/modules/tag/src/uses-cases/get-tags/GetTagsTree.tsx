import { Tree, TreeProps } from 'antd'
import { useTagState } from '../../domain/use-tag/useTagState'
import { useTagTree, useTagTrees } from '../../domain/use-tag/useTagTree'
import { useGetTagGraphQuery } from '../get-tag-graph/GetTagGraph.web.graphql.gen'
import { useGetTagGraphsQuery } from '../get-tag-graphs'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagGraphsQuery()
  const { setSelectedTag, setCheckedTags, selectedTag } = useTagState()
  const tagTrees = useTagTrees(data?.getTagGraphs)

  if (!data) {
    return null
  }

  const tags = data.getTagGraphs

  console.log(tags)
  console.log(tagTrees)

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
      // treeData={tagTree.getAntdTree().children}
      treeData={[]}
      // treeData={tags.map((tag) => ({
      //   key: tag.id,
      //   title: tag.name,
      //   children: [],
      // }))}
    />
  )
}
