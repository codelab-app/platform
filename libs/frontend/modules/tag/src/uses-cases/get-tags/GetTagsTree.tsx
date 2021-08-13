import { useGetTagsQuery } from '@codelab/shared/codegen/graphql'
import { Tree, TreeProps } from 'antd'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagsQuery()

  if (!data) {
    return null
  }

  const tags = data.getTags

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const onCheck: TreeProps['onCheck'] = (checked, info) => {
    //
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
      treeData={tags}
    />
  )
}
