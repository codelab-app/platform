import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { Renderer } from '@codelab/frontend/modules/builder'
import {
  PageContext,
  withPageQueryProvider,
} from '@codelab/frontend/modules/page'
import { PageDetailHeader } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React, { useContext } from 'react'

const PageRenderer: CodelabPage<any> = () => {
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
        <title>{page.name}</title>
      </Head>
      <Renderer tree={tree} />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageRenderer.Template = withPageQueryProvider(DashboardTemplate)
PageRenderer.Header = PageDetailHeader
PageRenderer.SidebarNavigation = null
PageRenderer.MainPane = null
PageRenderer.MetaPane = null

export default PageRenderer
