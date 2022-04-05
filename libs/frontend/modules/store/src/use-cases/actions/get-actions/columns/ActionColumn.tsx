import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { Action, actionRef, WithActionService } from '../../../../store'

type ActionColumnProps = WithActionService & {
  action: Action
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ action, actionService }) => {
    const onClickEdit = () =>
      actionService.updateModal.open(actionRef(action.id))

    const onClickDelete = () =>
      actionService.deleteModal.open(actionRef(action.id))

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
