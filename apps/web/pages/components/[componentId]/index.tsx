import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage, TemplateProps } from '@codelab/frontend/abstract/props'
import {
  Builder,
  MainPaneBuilderComponent,
  MetaPaneBuilderComponent,
} from '@codelab/frontend/modules/builder'
import {
  ElementGraphProvider,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { withEditorProvider } from '@codelab/frontend/presenter/container'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { ElementTree } from '@codelab/shared/core'
import { Empty } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const ComponentDetail: CodelabPage = () => {
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

      <Builder tree={elementTree} />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

const Template = ({
  children,
  ...props
}: React.PropsWithChildren<TemplateProps>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  return (
    <ElementGraphProvider elementId={componentId}>
      <DashboardTemplate {...props}>{children}</DashboardTemplate>
    </ElementGraphProvider>
  )
}

ComponentDetail.Template = withEditorProvider(Template)
ComponentDetail.MainPane = MainPaneBuilderComponent
ComponentDetail.MetaPane = MetaPaneBuilderComponent
ComponentDetail.Header = null
ComponentDetail.SidebarNavigation = SidebarNavigation

export default ComponentDetail
