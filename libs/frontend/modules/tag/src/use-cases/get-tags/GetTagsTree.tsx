import { CheckedKeys } from '@codelab/frontend/abstract/types'
import { css, SerializedStyles } from '@emotion/react'
import { Tree, TreeProps, Typography } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { useTagDispatch, useTagState, useTagTree } from '../../hooks'
import { useGetTagGraphsQuery } from '../../store'
import { UpdateTagIconButton } from '../update-tag/UpdateTagIconButton'

const tagNodeStyle: SerializedStyles = css({
  '&:hover': {
    button: {
      display: 'inline-block !important',
    },
  },
})

export const GetTagsTree = () => {
  const { data } = useGetTagGraphsQuery()
  const { setSelectedTag, setCheckedTags } = useTagDispatch()
  const { checkedTags } = useTagState()
  const tagTree = useTagTree(data?.tagGraphs)

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

  const makeCustomTag: TreeProps['titleRender'] = (node: DataNode) => {
    return (
      <Typography.Text css={tagNodeStyle}>
        {node.title}
        <UpdateTagIconButton id={node.key.toString()} />
      </Typography.Text>
    )
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
      titleRender={(node: DataNode) => makeCustomTag(node)}
      treeData={tagTreesData}
    />
  )
}
