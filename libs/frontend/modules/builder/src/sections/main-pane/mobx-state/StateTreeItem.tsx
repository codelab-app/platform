import { EyeOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { IStateTreeNode } from '../../../renderer/utils/platformState'
import { WithBuilderService } from '../../../store/BuilderService'
import { CopyPathButton } from './CopyPathButton'

interface StateTreeItemProps extends WithBuilderService {
  node: IStateTreeNode
}

export const StateTreeItem = observer<StateTreeItemProps>(
  ({ node, builderService }) => {
    const { type, path, name, useModal, content } = node

    const onPreview = async () => {
      builderService.stateModal.open(node)
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
