import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export const CreateLibraryButton = () => {
  // const { openCreateModal } = useCrudModalForm(EntityType.Library)

  return (
    <Button
      size="small"
      icon={<PlusOutlined />}
      // onClick={() => openCreateModal()}
    />
  )
}
