import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppPageContext, withAppQueryProvider } from '@codelab/frontend/shared'
import { MainPanePageDetail, PageRenderer } from '@codelab/modules/page'
import { Empty } from 'antd'
import { LayoutPageDetail } from 'apps/web/src/templates/Layout--pageDetail'
import React, { useContext } from 'react'
import { NextPageLayout } from '../../../../../src/templates/Layout.d'

const PageDetail: NextPageLayout<'builder'> = () => {
  const { page } = useContext(AppPageContext)

  if (!page) {
    return <Empty />
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <h1>{page?.name}</h1>
      <PageRenderer page={page} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageDetail.Layout = withAppQueryProvider(LayoutPageDetail)
PageDetail.MainPane = MainPanePageDetail

export default PageDetail
