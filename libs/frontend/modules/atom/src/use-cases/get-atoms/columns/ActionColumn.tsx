import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { atomRef } from '../../../store'
import { ActionColumnProps } from './types'

export const ActionColumn = observer<ActionColumnProps>(
  ({ atom, atomService }) => {
    const onClickEdit = () => atomService.updateModal.open(atomRef(atom.id))
    const onClickDelete = () => atomService.deleteModal.open([atomRef(atom.id)])

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
