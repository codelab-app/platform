import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { useAtomDispatch } from '../../../hooks'
import { ActionColumnProps } from './types'

export const ActionColumn = ({ atom }: ActionColumnProps) => {
  const { openUpdateModal, openDeleteModal } = useAtomDispatch()

  const onClickEdit = () =>
    openUpdateModal({
      updateId: atom.id,
      entity: atom,
    })

  const onClickDelete = () =>
    openDeleteModal({
      deleteIds: [atom.id],
      entity: atom,
    })

  return (
    <Space size="middle">
      <ListItemEditButton onClick={onClickEdit} />
      <ListItemDeleteButton onClick={onClickDelete} />
    </Space>
  )
}
