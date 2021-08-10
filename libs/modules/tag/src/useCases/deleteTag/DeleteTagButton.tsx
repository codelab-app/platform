import { PlusOutlined } from '@ant-design/icons'
import {
  DeleteButtonProps,
  EntityType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
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
