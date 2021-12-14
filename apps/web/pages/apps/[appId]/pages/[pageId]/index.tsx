import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { AppProvider } from '@codelab/frontend/modules/app'
import { Renderer } from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageDetailHeader,
  PageProvider,
  usePageState,
} from '@codelab/frontend/modules/page'
import { TypeKindProvider } from '@codelab/frontend/modules/type'
import {
  DashboardTemplate,
  DashboardTemplateProps,
} from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React from 'react'

const PageRenderer: CodelabPage<DashboardTemplateProps> = () => {
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

PageRenderer.Template = DashboardTemplate
PageRenderer.templateProps = {
  Header: PageDetailHeader,
  headerHeight: 38,
}
PageRenderer.providers = [AppProvider, PageProvider]

export default PageRenderer
