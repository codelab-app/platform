import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useLambdaDispatch } from '../../hooks'

export const CreateLambdaButton = () => {
  const { openCreateModal } = useLambdaDispatch()

  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
      Add
    </Button>
  )
}
