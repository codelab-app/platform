import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Builder,
  defaultRenderContext,
} from '@codelab/frontend/modules/builder'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import { MainPanePageDetail } from '../../../../../../../libs/frontend/modules/page/src/main-pane'
import { MetaPanePageDetail } from '../../../../../../../libs/frontend/modules/page/src/meta-pane'
import { PageDetailHeader } from '../../../../../src/sections/header'
import { NextPageTemplate } from '../../../../../src/templates/Layout.interface'
import { PageBuilderTemplate } from '../../../../../src/templates/PageBuilderTemplate'

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
