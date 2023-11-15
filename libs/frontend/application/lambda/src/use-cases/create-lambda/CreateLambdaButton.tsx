import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import React from 'react'

export const CreateLambdaButton = () => {
  return (
    <Button icon={<PlusOutlined />} onClick={() => null} type="primary">
      Add
    </Button>
  )
}
