import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { Button } from 'antd'
import { useTagDispatch } from '../../hooks'

export const DeleteTagsButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { openDeleteModal } = useTagDispatch()
  const onClick = () => openDeleteModal({ deleteIds: ids })

  return (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={onClick}
      type="primary"
    >
      Delete Tags
    </Button>
  )
}
