import { CheckedKeys } from '@codelab/frontend/abstract/types'
import { css, SerializedStyles } from '@emotion/react'
import { Tree, TreeProps, Typography } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import { WithTagService } from '../../store'
import { UpdateTagIconButton } from '../update-tag/UpdateTagIconButton'

const tagNodeStyle: SerializedStyles = css({
  '&:hover': {
    button: {
      display: 'inline-block !important',
    },
  },
})

export const GetTagsTree = observer<WithTagService>(({ tagService }) => {
  // const tagGraph = await tagService.getTagGraphs()

  // console.log(tagGraph)

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    // setSelectedTag({ key: selectedKeys[0] })
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const { checked } = checkedKeys as CheckedKeys
    // setCheckedTags({ keys: checked })
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
      checkedKeys={[]}
      onCheck={onCheck}
      onSelect={onSelect}
      /**
       * The root is a system root & shouldn't be shown
       */
      titleRender={(node: DataNode) => makeCustomTag(node)}
      treeData={[]}
    />
  )
})
