import { PlusOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'

export const CreatePageElementButton = (
  props: Omit<ButtonProps, 'onClick' | 'icon'>,
) => {
  const { openCreateModal } = useCRUDModalForm(EntityType.PageElement)

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal()}
      {...props}
    />
  )
}
