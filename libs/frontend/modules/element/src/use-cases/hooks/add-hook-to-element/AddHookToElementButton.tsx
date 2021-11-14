import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { hookActions } from '../../../store'

export const AddHookToElementButton = () => {
  const dispatch = useDispatch()
  const openCreateModal = () => dispatch(hookActions.openCreateModal())

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
