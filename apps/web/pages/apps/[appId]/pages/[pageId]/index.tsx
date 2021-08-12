import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Builder, defaultRenderContext } from '@codelab/frontend/builder'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/shared'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import {
  MainPanePageDetail,
  MetaPanePageDetail,
} from '../../../../../src/sections/panes'
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

  return (
    <RenderProvider context={defaultRenderContext({ tree })}>
      <Builder />
    </RenderProvider>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageDetail.Template = withPageQueryProvider(PageDetailTemplate)
PageDetail.MainPane = MainPanePageDetail
PageDetail.MetaPane = MetaPanePageDetail

export default PageDetail
