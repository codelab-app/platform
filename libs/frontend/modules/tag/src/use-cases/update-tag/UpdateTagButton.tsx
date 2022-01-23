import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
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
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={onClick}
      size="small"
      type="primary"
    >
      Update Tag
    </Button>
  )
}
