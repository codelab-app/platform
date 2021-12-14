import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { AppProvider } from '@codelab/frontend/modules/app'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageDetailHeader,
  PageProvider,
  usePageState,
} from '@codelab/frontend/modules/page'
import { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React from 'react'

const PageBuilder: CodelabPage<DashboardTemplateProps> = () => {
  const { currentPage } = usePageState()
  const { elementTree } = useElementGraphContext()

  if (!currentPage || !elementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{currentPage.name} | Builder | Codelab</title>
      </Head>

      <Builder tree={elementTree} />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

const MainPane = () => <MainPaneBuilder />

PageBuilder.Template = BuilderDashboardTemplate
PageBuilder.templateProps = {
  MainPane,
  Header: PageDetailHeader,
  SidebarNavigation: BuilderSidebarNavigation,
  MetaPane: MetaPaneBuilderPage,
  headerHeight: 38,
}
PageBuilder.providers = [BuilderContext, AppProvider, PageProvider]

export default PageBuilder
