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
import { Empty } from 'antd'
import Head from 'next/head'
import React from 'react'

const PageBuilder: CodelabPage<any> = () => {
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

export default PageBuilder

export const getServerSideProps = withPageAuthRequired()

PageBuilder.Layout = (page) => {
  return (
    <BuilderContext>
      <AppProvider>
        <PageProvider>
          <BuilderDashboardTemplate
            Header={PageDetailHeader}
            MainPane={MainPaneBuilder}
            MetaPane={MetaPaneBuilderPage}
            SidebarNavigation={BuilderSidebarNavigation}
            headerHeight={38}
          >
            {page.children}
          </BuilderDashboardTemplate>
        </PageProvider>
      </AppProvider>
    </BuilderContext>
  )
}
