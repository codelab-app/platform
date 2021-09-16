import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { initializeApollo } from '@codelab/frontend/model/infra/apollo'
import {
  Builder,
  MainPaneBuilderPage,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import {
  PageContext,
  withPageQueryProvider,
} from '@codelab/frontend/modules/page'
import {
  AppPagesGql,
  AppPagesQuery,
  AppPagesQueryVariables,
  useAppPagesQuery,
} from '@codelab/frontend/presenter/container'
import { PageDetailHeader } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React, { useContext } from 'react'

export interface BuilderProps {
  appId: string
}

const PageBuilder: CodelabPage<BuilderProps> = (props) => {
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

const BuilderHeader = (props: BuilderProps) => {
  const { data, loading } = useAppPagesQuery({
    variables: {
      input: {
        byId: { appId: props.appId },
      },
    },
  })

  return <PageDetailHeader app={data?.app} />
}

PageBuilder.Header = BuilderHeader
PageBuilder.Template = withPageQueryProvider(DashboardTemplate)
PageBuilder.SidebarNavigation = SidebarNavigation
PageBuilder.MainPane = MainPaneBuilderPage
PageBuilder.MetaPane = MetaPaneBuilderPage

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    const session = await getSession(context.req, context.res)
    const appId = context.query.appId

    console.log(session)

    if (!appId) {
      throw new Error('Missing appId')
    }

    const apolloClient = initializeApollo()

    await apolloClient.query<AppPagesQuery, AppPagesQueryVariables>({
      query: AppPagesGql,
      variables: {
        input: {
          byId: { appId: `${appId}` },
        },
      },
    })

    return {
      props: {},
    }
  },
})

export default PageBuilder
