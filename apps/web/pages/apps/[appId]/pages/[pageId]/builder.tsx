import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  Builder,
  MainPaneBuilderPage,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageContext,
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

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    //  const session = await getSession(context.req, context.res)
    const appId = context.query.appId as string

    /*     
    const apolloClient = initializeApollo({
      accessToken: session?.accessToken,
    })

    await apolloClient.query<AppPagesQuery, AppPagesQueryVariables>({
      query: AppPagesGql,
      variables: {
        input: {
          byId: { appId: `${appId}` },
        },
      },
    })
 */

    // TODO: Add typing to GetServerSideProps
    const props: BuilderProps = {
      appId,
    }

    return {
      props,
    }
  },
})

PageBuilder.Header = BuilderHeader
PageBuilder.Template = withPageQueryProvider(DashboardTemplate)
PageBuilder.SidebarNavigation = SidebarNavigation
PageBuilder.MainPane = MainPaneBuilderPage
PageBuilder.MetaPane = MetaPaneBuilderPage

export default PageBuilder
