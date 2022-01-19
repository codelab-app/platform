import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTagDispatch } from '../../hooks'

export const CreateTagButton = () => {
  const { openCreateModal } = useTagDispatch()
  const onClick = () => openCreateModal()

  return (
    <Button icon={<PlusOutlined />} onClick={onClick} type="primary">
      Create Tag
    </Button>
  )
}
