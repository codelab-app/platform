import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useBuilderLayout } from '../../../builder/builderPanelState'

export const CreatePageButton = () => {
  const layout = useBuilderLayout()

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => layout.details.toggle(true)}
    >
      Add
    </Button>
  )
}
