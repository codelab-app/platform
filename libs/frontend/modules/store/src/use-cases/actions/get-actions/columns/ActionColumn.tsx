import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { actionRef } from '../../../../store'
import { ActionColumnProps } from './types'

export const ActionColumn = observer(
  ({ action, actionStore }: ActionColumnProps) => {
    const onClickEdit = () => actionStore.updateModal.open(actionRef(action.id))

    const onClickDelete = () =>
      actionStore.deleteModal.open([actionRef(action.id)])

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
