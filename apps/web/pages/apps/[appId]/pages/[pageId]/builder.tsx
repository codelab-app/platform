import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { reduxStoreWrapper } from '@codelab/frontend/model/infra/redux'
import {
  Builder,
  MainPaneBuilderPage,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageContext,
  pageEndpoints,
  useAppPagesQuery,
  withPageQueryProvider,
} from '@codelab/frontend/modules/page'
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
  const { page, loading } = useContext(PageContext)
  const { elementTree } = useElementGraphContext()

  if (loading) {
    return null
  }

  if (!page || !elementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{page.name} | Builder | Codelab</title>
      </Head>

      <Builder tree={elementTree} />
    </>
  )
}

const BuilderHeader = (props: BuilderProps) => {
  const { data, isLoading } = useAppPagesQuery({
    variables: {
      input: {
        byId: {
          appId: props.appId,
        },
      },
    },
  })

  return <PageDetailHeader app={data?.app ?? null} />
}

export const preFetchPages = reduxStoreWrapper.getServerSideProps(
  (store) => async (context) => {
    const appId = context.query.appId as string

    store.dispatch(
      pageEndpoints.endpoints.GetPages.initiate({
        variables: {
          input: {
            byApp: {
              appId,
            },
          },
        },
      }),
    )
    await Promise.all(pageEndpoints.util.getRunningOperationPromises())

    return {
      props: {
        appId,
      },
    }
  },
)

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    return await preFetchPages(context)
  },
})

PageBuilder.Header = BuilderHeader
PageBuilder.Template = withPageQueryProvider(DashboardTemplate)
PageBuilder.SidebarNavigation = SidebarNavigation
PageBuilder.MainPane = MainPaneBuilderPage
PageBuilder.MetaPane = MetaPaneBuilderPage

export default PageBuilder
