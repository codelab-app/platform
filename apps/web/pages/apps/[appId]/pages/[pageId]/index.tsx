import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { Renderer } from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  usePageState,
  withPageQueryProvider,
} from '@codelab/frontend/modules/page'
import { TypeKindProvider } from '@codelab/frontend/modules/type'
import { PageDetailHeader } from '@codelab/frontend/view/sections'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React from 'react'

const PageRenderer: CodelabPage<any> = () => {
  const { currentPage } = usePageState()
  const { elementTree } = useElementGraphContext()

  if (!elementTree || !currentPage) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{currentPage.name}</title>
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
