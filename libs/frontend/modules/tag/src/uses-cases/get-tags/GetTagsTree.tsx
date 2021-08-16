import { useGetTagGraphQuery } from '@codelab/shared/codegen/graphql'
import { Tree, TreeProps } from 'antd'
import { useTagState } from '../../useTagState'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagGraphQuery()
  const { setSelectedTag, setCheckedTags, selectedTag } = useTagState()

  if (!data) {
    return null
  }

  const tags = data.getTagGraph

  console.log(tags)

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
      treeData={[]}
      // treeData={tags.map((tag) => ({
      //   key: tag.id,
      //   title: tag.name,
      //   children: [],
      // }))}
    />
  )
}
