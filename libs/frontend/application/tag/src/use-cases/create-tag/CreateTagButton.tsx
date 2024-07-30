import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import React from 'react'
import { useCreateTagModal } from './create-tag.data'

export const CreateTagButton = () => {
  const createTagModal = useCreateTagModal()

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={() => createTagModal.open()}
      type="primary"
    >
      Create Tag
    </Button>
  )
}
