import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { tagActions } from '../../store/tagState'

export const DeleteTagsButton = ({ disabled, ids }: DeleteButtonProps) => {
  const dispatch = useDispatch()

  const openDeleteModal = () =>
    dispatch(tagActions.openDeleteModal({ deleteIds: ids }))

  return (
    <Button
      type="primary"
      danger
      onClick={() => {
        openDeleteModal()
      }}
      disabled={disabled}
      icon={<DeleteOutlined />}
    >
      Delete Tags
    </Button>
  )
}
