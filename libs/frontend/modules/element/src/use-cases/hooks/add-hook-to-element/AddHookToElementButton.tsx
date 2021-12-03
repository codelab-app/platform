import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useHookDispatch } from '../../../hooks'

export const AddHookToElementButton = () => {
  const { openCreateModal } = useHookDispatch()
  const onClick = () => openCreateModal()

  return (
    <Button type="primary" onClick={onClick} icon={<PlusOutlined />}>
      Add hook
    </Button>
  )
}
