import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/props'
import { Button } from 'antd'
import { useTagDispatch } from '../../hooks'

export const UpdateTagButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useTagDispatch()

  const onClick = () => {
    if (!id) {
      throw new Error('Tag ID is not valid')
    }

    openUpdateModal({ updateId: id })
  }

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      onClick={onClick}
      icon={<EditOutlined />}
    >
      Update Tag
    </Button>
  )
}
