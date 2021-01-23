import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export const DashboardNavigation = () => {
  return (
    <>
      <Button size="small" icon={<PlusOutlined />}>
        Add
      </Button>
    </>
  )
}
