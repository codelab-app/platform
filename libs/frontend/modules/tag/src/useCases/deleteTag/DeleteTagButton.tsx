import { PlusOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/props'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Button } from 'antd'

export const DeleteTagButton = ({ disabled, ids }: DeleteButtonProps) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Tag)

  return (
    <Button
      type="primary"
      danger
      onClick={() => openDeleteModal(ids)}
      disabled={disabled}
      icon={<PlusOutlined />}
    >
      Delete Tag
    </Button>
  )
}
