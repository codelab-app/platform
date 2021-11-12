import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { elementActions } from '../elementState'

export const CreateElementButton = (
  props: Omit<ButtonProps, 'onClick' | 'icon'>,
) => {
  const dispatch = useDispatch()
  const openCreateModal = () => dispatch(elementActions.openCreateModal())

  return (
    <Button
      icon={<PlusOutlined data-testid="create-page-element-button" />}
      onClick={() => openCreateModal()}
      {...props}
    />
  )
}
