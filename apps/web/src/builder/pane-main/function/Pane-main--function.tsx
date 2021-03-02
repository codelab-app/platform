import { Space } from 'antd'
import React from 'react'
import { PageMainClose } from '../page/Page-main--close'
import { CreateFunctionButton } from 'apps/web/src/useCases/functions/createFunction/CreateFunctionButton'

export const PaneMainFunction = () => {
  return (
    <>
      <Space align="baseline">
        <h2>Functions</h2>
        <PageMainClose />
        <CreateFunctionButton />
      </Space>
    </>
  )
}
