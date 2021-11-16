import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { usePageDispatch } from '../../hooks'

export const CreatePageButton = () => {
  const { openCreateModal } = usePageDispatch()

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={openCreateModal}
    />
  )
}
