import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  Builder,
  defaultRenderContext,
} from '@codelab/frontend/modules/builder'
import {
  PageDetailHeader,
  PageDetailMainPane,
  PageDetailMetaPane,
} from '@codelab/frontend/modules/page'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/presenter/container'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React, { useContext } from 'react'

const PageBuilder: CodelabPage = () => {
  const { tree, page, loading } = useContext(PageContext)

  if (loading) {
    return null
  }

  if (!tree || !page) {
    return <Empty />
  }

  return (
    <RenderProvider context={defaultRenderContext({ tree })}>
      <Head>
        <title>{page.name} | Builder | Codelab</title>
      </Head>

      <Builder />
    </RenderProvider>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageBuilder.Header = PageDetailHeader
PageBuilder.Template = withPageQueryProvider(DashboardTemplate)
PageBuilder.SidebarNavigation = SidebarNavigation
PageBuilder.MainPane = PageDetailMainPane
PageBuilder.MetaPane = PageDetailMetaPane

export default PageBuilder
