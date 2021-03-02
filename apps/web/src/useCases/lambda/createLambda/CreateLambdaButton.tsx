import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import {
  LayoutPaneVisibility,
  useLayout,
} from 'apps/web/src/templates/layout-state'

export const CreateLambdaButton = () => {
  const { setPaneVisibility } = useLayout()

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => setPaneVisibility(LayoutPaneVisibility.Detail)}
    >
      Add
    </Button>
  )
}
