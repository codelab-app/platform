import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { getGraphQLClient } from '@codelab/frontend/model/infra/redux'
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
import { userSlice } from '@codelab/frontend/modules/user'
import { Empty } from 'antd'
import { reduxStoreWrapper } from 'apps/web/src/store/reduxStoreWrapper'
import { GetServerSidePropsContext } from 'next'
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

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: reduxStoreWrapper.getServerSideProps(
    (store) =>
      async ({ req, res }: GetServerSidePropsContext) => {
        const session = await getSession(req, res)

        getGraphQLClient().setHeaders({
          cookie: `${req.headers.cookie}`,
        })

        store.dispatch(userSlice.actions.setAuthenticatedUser(session?.user))

        return { props: {} }
      },
  ),
})

PageBuilder.Layout = (page) => {
  return (
    <BuilderContext>
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
    </BuilderContext>
  )
}
