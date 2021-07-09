import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const CreateFieldButton = () => {
  const { openCreateModal } = useCrudModalForm(EntityType.Field)

  return (
    <Button
      size="small"
      type="primary"
      css={tw`flex justify-center items-center`}
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
    />
  )
}
