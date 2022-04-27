import { ACTION_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IAction } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { actionRef } from '../../../../store'

type ActionColumnProps = WithServices<ACTION_SERVICE> & {
  action: IAction
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
