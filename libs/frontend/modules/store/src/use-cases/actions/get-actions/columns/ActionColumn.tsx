import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { actionRef } from '../../../../store'
import { ActionColumnProps } from './types'

export const ActionColumn = observer(
  ({ action, actionService }: ActionColumnProps) => {
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
