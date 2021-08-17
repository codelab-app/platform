import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  Builder,
  defaultRenderContext,
} from '@codelab/frontend/modules/builder'
import {
  ComponentDetailMainPane,
  ComponentDetailMetaPane,
} from '@codelab/frontend/modules/component'
import {
  ComponentContext,
  RenderProvider,
  withComponentQueryProvider,
  withEditorProvider,
} from '@codelab/frontend/presenter/container'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { Empty } from 'antd'
import Head from 'next/head'
import React, { useContext } from 'react'

const ComponentDetail: CodelabPage = () => {
  const { component, tree } = useContext(ComponentContext)

  if (!tree || !component) {
    return <Empty />
  }

  return (
    <RenderProvider context={defaultRenderContext({ tree })}>
      <Head>
        <title>{component.name} | Codelab</title>
      </Head>

      <Builder />
    </RenderProvider>
  )
}

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Template = withEditorProvider(
  withComponentQueryProvider(DashboardTemplate),
)
ComponentDetail.MainPane = ComponentDetailMainPane
ComponentDetail.MetaPane = ComponentDetailMetaPane
ComponentDetail.Header = null
ComponentDetail.SidebarNavigation = null

export default ComponentDetail
