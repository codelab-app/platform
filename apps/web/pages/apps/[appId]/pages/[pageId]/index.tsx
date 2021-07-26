import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  MainPanePageDetail,
  MetaPanePageDetail,
  PageBuilder,
  PageContext,
  withPageQueryProvider,
} from '@codelab/modules/page'
import { Empty } from 'antd'
import { PageDetailTemplate } from 'apps/web/src/templates/PageDetailTemplate'
import React, { useContext } from 'react'
import { NextPageTemplate } from '../../../../../src/templates/Layout.d'

const PageDetail: NextPageTemplate<'builder'> = () => {
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

PageDetail.Template = withPageQueryProvider(PageDetailTemplate)
PageDetail.MainPane = MainPanePageDetail
PageDetail.MetaPane = MetaPanePageDetail

export default PageDetail
