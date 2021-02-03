import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { usePage } from '../usePage'

export const CreatePageButton = () => {
  const { createPage } = usePage()

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => createPage()}
    >
      Add
    </Button>
  )
}
