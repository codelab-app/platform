import { CopyOutlined } from '@ant-design/icons'
import { copyTextToClipboard } from '@codelab/frontend/shared/utils'
import { Button, message, Tag } from 'antd'
import tw from 'twin.macro'
import {
  IStateTreeNode,
  mobxStateKeyTemplate,
} from '../../../renderer/utils/platformState'

interface StateTreeItemProps {
  node: IStateTreeNode
}

export const StateTreeItem = ({ node }: StateTreeItemProps) => {
  const { type, path, name } = node
  const { start, end } = mobxStateKeyTemplate

  const success = () => {
    message.success('Copied to clipboard !', 1)
  }

  return (
    <div css={tw`flex flex-row  items-center`}>
      <div css={tw`flex-grow flex-shrink`}>
        {name}
        <span css={tw`ml-2`}>
          <Tag>{type}</Tag>
        </span>
      </div>
      <Button
        icon={<CopyOutlined />}
        onClick={async () => {
          await copyTextToClipboard(`${start}${path}${end}`)
          success()
        }}
        size="small"
      />
    </div>
  )
}
