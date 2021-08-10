import { EditOutlined } from '@ant-design/icons'
import {
  EntityType,
  UpdateButtonProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Button } from 'antd'

export const UpdateTagButton = ({ id, disabled }: UpdateButtonProps) => {
  const { openUpdateModal } = useCrudModalForm(EntityType.Tag)

  return (
    <Button
      size="small"
      type="primary"
      disabled={disabled}
      ghost
      onClick={() => {
        if (!id) {
          throw new Error('Tag ID is not valid')
        }

        openUpdateModal(id)
      }}
      icon={<EditOutlined />}
    >
      Update Tag
    </Button>
  )
}
