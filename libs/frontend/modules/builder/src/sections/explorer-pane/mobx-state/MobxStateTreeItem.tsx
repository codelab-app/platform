import { EyeOutlined } from '@ant-design/icons'
import { IModalService, IStateTreeNode } from '@codelab/shared/abstract/core'
import { Button, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { CopyPathButton } from './CopyPathButton'

type StateTreeItemProps = Pick<IModalService<IStateTreeNode>, 'open'> & {
  node: IStateTreeNode
}

export const MobxStateTreeItem = observer<StateTreeItemProps>(
  ({ node, open }) => {
    const { type, path, name, useModal, content } = node

    const onPreview = async () => {
      open(node)
    }

    if (!node) {
      return null
    }

    return (
      <div css={tw`flex flex-row items-center`}>
        <div css={tw`flex-grow flex-shrink`}>
          {name}
          <span css={tw`ml-2`}>
            <Tag>{type}</Tag>
          </span>
        </div>
        {useModal && content ? (
          <Button icon={<EyeOutlined />} onClick={onPreview} size="small" />
        ) : (
          <CopyPathButton path={path} />
        )}
      </div>
    )
  },
)
