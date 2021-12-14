import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
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
import { DashboardTemplateProps } from '@codelab/frontend/view/templates'
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

      <Builder tree={elementTree} isComponentBuilder />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

const ComponentElementGraphProvider = ({
  children,
}: React.PropsWithChildren<any>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  return (
    <ElementGraphProvider elementId={componentId}>
      {children}
    </ElementGraphProvider>
  )
}

ComponentDetail.Template = BuilderDashboardTemplate
ComponentDetail.templateProps = {
  MainPane: () => <MainPaneBuilder isComponentBuilder />,
  MetaPane: MetaPaneBuilderComponent,
  SidebarNavigation: BuilderSidebarNavigation,
}
ComponentDetail.providers = [ComponentElementGraphProvider]

export default ComponentDetail
