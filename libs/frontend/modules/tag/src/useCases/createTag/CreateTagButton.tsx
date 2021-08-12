import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'

export const CreateTagButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Tag)

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
