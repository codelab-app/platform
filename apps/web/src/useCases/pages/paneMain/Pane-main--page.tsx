import { Space } from 'antd'
import React from 'react'
import { PageMainClose } from './Page-main--close'
import { CreatePageButton } from 'apps/web/src/useCases/pages/createPage/CreatePageButton'
import { CreatePageModal } from 'apps/web/src/useCases/pages/createPage/CreatePageModal'
import { GetPagesList } from 'apps/web/src/useCases/pages/getPages/GetPagesList'

export const PaneMainPage = () => {
  return (
    <>
      <Space align="baseline">
        <h2>Pages</h2>
        <PageMainClose />
        <CreatePageButton />
      </Space>
      <GetPagesList />
      <CreatePageModal />
    </>
  )
}
