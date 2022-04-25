import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import {
  Operation,
  operationRef,
  WithOperationService,
} from '../../../../store'

type ActionColumnProps = WithOperationService & {
  operation: Operation
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ operation, operationService }) => {
    const onClickEdit = () =>
      operationService.updateModal.open(operationRef(operation.id))

    const onClickDelete = () =>
      operationService.deleteModal.open(operationRef(operation.id))

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
