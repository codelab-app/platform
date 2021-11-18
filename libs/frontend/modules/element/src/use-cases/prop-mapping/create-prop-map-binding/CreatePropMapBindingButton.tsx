import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { usePropMapBindingDispatch } from '../../../hooks'

export const CreatePropMapBindingButton = () => {
  const { openCreateModal } = usePropMapBindingDispatch()

  return (
    <Button
      type="primary"
      onClick={() => openCreateModal()}
      icon={<PlusOutlined />}
    >
      Add Map Binding
    </Button>
  )
}
