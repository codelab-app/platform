import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { usePropMapBindingDispatch } from '../../../hooks'

export const CreatePropMapBindingButton = () => {
  const { openCreateModal } = usePropMapBindingDispatch()

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={() => openCreateModal()}
      type="primary"
    >
      Add Map Binding
    </Button>
  )
}
