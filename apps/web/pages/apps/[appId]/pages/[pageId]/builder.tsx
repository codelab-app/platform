import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  Builder,
  MainPaneBuilderPage,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import {
  PageContext,
  PageDetailHeader,
  withPageQueryProvider,
} from '@codelab/frontend/modules/page'
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
    <>
      <Head>
        <title>{page.name} | Builder | Codelab</title>
      </Head>

      <Builder tree={tree} />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageBuilder.Header = PageDetailHeader
PageBuilder.Template = withPageQueryProvider(DashboardTemplate)
PageBuilder.SidebarNavigation = SidebarNavigation
PageBuilder.MainPane = MainPaneBuilderPage
PageBuilder.MetaPane = MetaPaneBuilderPage

export default PageBuilder
