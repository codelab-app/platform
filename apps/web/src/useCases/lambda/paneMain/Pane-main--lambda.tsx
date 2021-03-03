import { Space } from 'antd'
import React from 'react'
import { PageMainClose } from '../../pages/paneMain/Page-main--close'
import { CreateLambdaButton } from 'apps/web/src/useCases/lambda/createLambda/CreateLambdaButton'

export const PaneMainLambda = () => {
  return (
    <>
      <Space align="baseline">
        <h2>Functions</h2>
        <PageMainClose />
        <CreateLambdaButton />
      </Space>
    </>
  )
}
