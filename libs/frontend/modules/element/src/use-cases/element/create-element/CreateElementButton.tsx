import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { elementActions } from '../../../store'

export interface CreateElementButtonProps
  extends Omit<ButtonProps, 'onClick' | 'icon'> {
  parentElementId?: string
}

export const CreateElementButton = ({
  parentElementId,
  ...props
}: CreateElementButtonProps) => {
  const dispatch = useDispatch()

  const openCreateModal = () =>
    dispatch(elementActions.openCreateModal({ parentElementId }))

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal()}
      {...props}
    />
  )
}
