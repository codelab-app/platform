import {
  OPERATION_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IOperation } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { operationRef } from '../../../../store'

type ActionColumnProps = WithServices<OPERATION_SERVICE> & {
  operation: IOperation
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
