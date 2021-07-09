import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'

export const CreateElementButton = (
  props: Omit<ButtonProps, 'onClick' | 'icon'>,
) => {
  const { openCreateModal } = useCrudModalForm(EntityType.Element)

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal()}
      {...props}
    />
  )
}
