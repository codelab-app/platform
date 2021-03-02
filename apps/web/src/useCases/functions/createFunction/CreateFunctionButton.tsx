import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import {
  LayoutPaneVisibility,
  useLayout,
} from 'apps/web/src/layout/layout-state'

export const CreateFunctionButton = () => {
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
