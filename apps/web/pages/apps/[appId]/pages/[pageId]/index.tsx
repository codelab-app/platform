import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { Renderer } from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageContext,
  withPageQueryProvider,
} from '@codelab/frontend/modules/page'
import { TypeKindProvider } from '@codelab/frontend/modules/type'
import { PageDetailHeader } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React, { useContext } from 'react'

const PageRenderer: CodelabPage<any> = () => {
  const { page, loading } = useContext(PageContext)
  const { elementTree } = useElementGraphContext()

  if (loading) {
    return null
  }

  if (!elementTree || !page) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>

      <TypeKindProvider>
        <Renderer tree={elementTree} />
      </TypeKindProvider>
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
