import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  MainPanePageDetail,
  PageBuilder,
  PageContext,
  withPageQueryProvider,
} from '@codelab/modules/page'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import { NextPageTemplate } from '../../../../../src/templates/Layout.interface'
import { PageDetailTemplate } from '../../../../../src/templates/PageDetailTemplate'

const PageDetail: NextPageTemplate<'builder'> = () => {
  const { tree, page, loading } = useContext(PageContext)

  if (loading) {
    return null
  }

  if (!tree || !page) {
    return <Empty />
  }

  return <PageBuilder tree={tree} pageId={page.id} />
}

export const getServerSideProps = withPageAuthRequired()

PageDetail.Template = withPageQueryProvider(PageDetailTemplate)
PageDetail.MainPane = MainPanePageDetail

export default PageDetail
