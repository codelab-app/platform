import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export const AddHookToElementButton = () => {
  // const { openCreateModal } = useHookDispatch()
  // const onClick = () => openCreateModal()

  return (
    <Button icon={<PlusOutlined />} type="primary">
      Add hook
    </Button>
  )
}
