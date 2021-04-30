import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppContext } from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { PageRenderer, PanePage } from '@codelab/modules/page'
import { Empty } from 'antd'
import { LayoutPageDetail } from 'apps/web/src/layout/Layout--pageDetail'
import { NextPageLayout } from '../../../../../src/layout/Layout.d'

const PageDetail: NextPageLayout<'builder'> = () => {
  const { page } = useContext(AppContext)

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

PageDetail.Layout = LayoutPageDetail
PageDetail.MainPane = PanePage

export default PageDetail
