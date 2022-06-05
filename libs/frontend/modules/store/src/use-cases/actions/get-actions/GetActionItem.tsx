import { FileOutlined } from '@ant-design/icons'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IAction, IActionService } from '@codelab/shared/abstract/core'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { actionRef } from '../../../store'

export type GetActionItemProps = {
  action: IAction
  actionService: IActionService
}

export const GetActionItem = observer<GetActionItemProps>(
  ({ action, actionService }) => {
    const onClickDelete = () =>
      actionService.deleteModal.open(actionRef(action.id))

    const onClickEdit = () =>
      actionService.updateModal.open(actionRef(action.id))

    return (
      <List.Item style={{ paddingLeft: 0 }}>
        <Space style={{ width: '100%' }}>
          <FileOutlined />
          <p>{action.name}</p>
        </Space>
        <Space>
          <ListItemEditButton onClick={onClickEdit} />
          <ListItemDeleteButton onClick={onClickDelete} />
        </Space>
      </List.Item>
    )
  },
)
