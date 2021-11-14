import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { tagActions } from '../../store/tagState'

export const CreateTagButton = () => {
  const dispatch = useDispatch()
  const openCreateModal = () => dispatch(tagActions.openCreateModal())

  return (
    <Button
      type="primary"
      onClick={() => openCreateModal()}
      icon={<PlusOutlined />}
    >
      Create Tag
    </Button>
  )
}
