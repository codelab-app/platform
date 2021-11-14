import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/props'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { tagActions } from '../../store/tagState'

export const UpdateTagButton = ({ id, disabled }: UpdateButtonProps) => {
  const dispatch = useDispatch()

  const openUpdateModal = () =>
    dispatch(tagActions.openUpdateModal({ updateId: id }))

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      onClick={() => {
        if (!id) {
          throw new Error('Tag ID is not valid')
        }

        openUpdateModal()
      }}
      icon={<EditOutlined />}
    >
      Update Tag
    </Button>
  )
}
