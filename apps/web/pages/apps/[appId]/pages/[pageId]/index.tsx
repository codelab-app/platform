import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  defaultRenderContext,
  Renderer,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/presenter/container'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React, { useContext } from 'react'

const PageRenderer: CodelabPage = () => {
  const { tree, page, loading } = useContext(PageContext)

  if (loading) {
    return null
  }

  if (!tree || !page) {
    return <Empty />
  }

  return (
    <RenderProvider
      context={defaultRenderContext({
        tree,
      })}
    >
      <Head>
        <title>{page.name}</title>
      </Head>

      <Renderer />
    </RenderProvider>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageRenderer.Template = withPageQueryProvider(DashboardTemplate)
PageRenderer.Header = PageDetailHeader
PageRenderer.SidebarNavigation = null
PageRenderer.MainPane = null
PageRenderer.MetaPane = null

export default PageRenderer
