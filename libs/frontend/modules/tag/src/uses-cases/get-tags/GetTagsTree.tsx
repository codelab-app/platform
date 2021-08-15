import { useGetTagsQuery } from '@codelab/shared/codegen/graphql'
import { Tree, TreeProps } from 'antd'
import { useTagTree } from '../../useTagTree'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagsQuery()
  const { setSelectedTag, setCheckedTags, selectedTag } = useTagTree()

  if (!data) {
    return null
  }

  const tags = data.getTags

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
      // treeData={treeData}
      treeData={tags.map((tag) => ({
        key: tag.id,
        title: tag.name,
        children: [],
      }))}
    />
  )
}
