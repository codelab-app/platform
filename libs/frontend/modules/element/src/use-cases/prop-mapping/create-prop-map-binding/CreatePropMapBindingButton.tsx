import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { propMapBindingActions } from '../../../store'

export const CreatePropMapBindingButton = () => {
  const dispatch = useDispatch()

  const openCreateModal = () =>
    dispatch(propMapBindingActions.openCreateModal())

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
