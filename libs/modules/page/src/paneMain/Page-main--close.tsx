import { CloseOutlined } from '@ant-design/icons'
import { LayoutPaneVisibility, useLayout } from '@codelab/frontend/layout'
import React from 'react'

export const PageMainClose = () => {
  const { setPaneVisibility } = useLayout()

  return (
    <CloseOutlined
      onClick={() => setPaneVisibility(LayoutPaneVisibility.None)}
    />
  )
}
