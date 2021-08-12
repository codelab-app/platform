import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  Builder,
  defaultRenderContext,
  PageBuilderTemplate,
} from '@codelab/frontend/modules/builder'
import {
  MainPanePageDetail,
  MetaPanePageDetail,
  PageDetailHeader,
} from '@codelab/frontend/modules/page'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import React, { useContext } from 'react'

const PageBuilder: NextPageTemplate<'builder'> = () => {
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

PageBuilder.Header = PageDetailHeader
PageBuilder.Template = withPageQueryProvider(PageBuilderTemplate)
PageBuilder.MainPane = MainPanePageDetail
PageBuilder.MetaPane = MetaPanePageDetail

export default PageBuilder
