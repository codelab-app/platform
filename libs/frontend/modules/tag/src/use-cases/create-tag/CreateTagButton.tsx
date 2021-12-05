import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTagDispatch } from '../../hooks'

export const CreateTagButton = () => {
  const { openCreateModal } = useTagDispatch()
  const onClick = () => openCreateModal()

  return (
    <Button type="primary" onClick={onClick} icon={<PlusOutlined />}>
      Create Tag
    </Button>
  )
}
