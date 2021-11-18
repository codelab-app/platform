import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'
import { useElementDispatch } from '../../../hooks'

export interface CreateElementButtonProps
  extends Omit<ButtonProps, 'onClick' | 'icon'> {
  parentElementId?: string
}

export const CreateElementButton = ({
  parentElementId,
  ...props
}: CreateElementButtonProps) => {
  const { openCreateModal } = useElementDispatch()

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal({ parentElementId })}
      {...props}
    />
  )
}
