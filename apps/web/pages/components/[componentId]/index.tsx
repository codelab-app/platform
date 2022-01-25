import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import {
  Builder,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderComponent,
} from '@codelab/frontend/modules/builder'
import {
  ElementGraphProvider,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { ElementTree } from '@codelab/shared/core'
import { Empty } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const ComponentDetail: CodelabPage<DashboardTemplateProps> = () => {
  const { elementTree } = useElementGraphContext()

  if (!elementTree) {
    return <Empty />
  }

  const root = elementTree.getRootVertex(ElementTree.isComponent)

  return (
    <>
      <Head>
        <title>{root?.componentTag?.name} | Codelab</title>
      </Head>

      <Builder isComponentBuilder tree={elementTree} />
    </>
  )
}

const ComponentElementGraphProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  return (
    <ElementGraphProvider elementId={componentId}>
      {children}
    </ElementGraphProvider>
  )
}

export default ComponentDetail

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Layout = (page) => {
  return (
    <ComponentElementGraphProvider>
      <BuilderDashboardTemplate
        MainPane={() => <MainPaneBuilder isComponentBuilder />}
        MetaPane={MetaPaneBuilderComponent}
        SidebarNavigation={BuilderSidebarNavigation}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </ComponentElementGraphProvider>
  )
}
