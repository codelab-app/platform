import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { LayoutPaneVisibility } from 'apps/web/src/templates/layout-state'
import { usePage } from 'apps/web/src/useCases/pages/usePage'

export const PageMainClose = () => {
  const { setPaneVisibility } = usePage()

  return (
    <CloseOutlined
      onClick={() => setPaneVisibility(LayoutPaneVisibility.None)}
    />
  )
}
