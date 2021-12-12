import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { withAppProvider } from '@codelab/frontend/modules/app'
import {
  Builder,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
  withBuilderContext,
} from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  useAppPagesQuery,
  usePageState,
  withPageProvider,
} from '@codelab/frontend/modules/page'
import { PageDetailHeader } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'

export interface BuilderProps {
  appId: string
}

const PageBuilder: CodelabPage<BuilderProps> = (props) => {
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

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    const appId = context.query.appId as string

    // TODO: Add typing to GetServerSideProps
    const props: BuilderProps = {
      appId,
    }

    return {
      props,
    }
  },
})

const MainPane = () => <MainPaneBuilder />

PageBuilder.Header = BuilderHeader
PageBuilder.Template = withBuilderContext(
  withAppProvider(withPageProvider(DashboardTemplate)),
)
PageBuilder.SidebarNavigation = BuilderSidebarNavigation
PageBuilder.MainPane = MainPane
PageBuilder.MetaPane = MetaPaneBuilderPage

export default PageBuilder
