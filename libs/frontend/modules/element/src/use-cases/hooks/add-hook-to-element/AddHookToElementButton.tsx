import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useHookDispatch } from '../../../hooks/useHookDispatch'

export const AddHookToElementButton = () => {
  const { openCreateModal } = useHookDispatch()

  return (
    <Button
      type="primary"
      onClick={() => openCreateModal()}
      icon={<PlusOutlined />}
    >
      Add hook
    </Button>
  )
}
