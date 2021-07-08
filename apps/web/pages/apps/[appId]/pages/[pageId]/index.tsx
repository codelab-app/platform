import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  MainPanePageDetail,
  MetaPanePageDetail,
  PageBuilder,
  PageContext,
  withPageQueryProvider,
} from '@codelab/modules/page'
import { Empty } from 'antd'
import { LayoutPageDetail } from 'apps/web/src/templates/Layout--pageDetail'
import React, { useContext } from 'react'
import { NextPageLayout } from '../../../../../src/templates/Layout.d'

const PageDetail: NextPageLayout<'builder'> = () => {
  const { cytoscapeRoot, page, loading } = useContext(PageContext)

  if (loading) {
    return null
  }

  if (!cytoscapeRoot || !page) {
    return <Empty />
  }

  return <PageBuilder cy={cytoscapeRoot} />
}

export const getServerSideProps = withPageAuthRequired()

PageDetail.Layout = withPageQueryProvider(LayoutPageDetail)
PageDetail.MainPane = MainPanePageDetail
PageDetail.MetaPane = MetaPanePageDetail

export default PageDetail
