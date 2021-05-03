import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export const DeleteComponentButton = () => (
  <Button
    size="small"
    danger
    icon={<DeleteOutlined />}
    onClick={() => {
      // console.log(checkedAtomIds)
    }}
  />
)
