import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import {
  ElementGraphProvider,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import { Empty } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AppProviderBuilder: CodelabPage<any> = observer(() => {
  const store = useStore()
  const { app } = useCurrentApp(store.appStore)
  const { elementTree } = useElementGraphContext()

  if (!app || !elementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{app?.name} | Provider Builder | Codelab</title>
      </Head>
      <Builder tree={elementTree} typeStore={store.typeStore} />
    </>
  )
})

export default AppProviderBuilder

export const getServerSideProps = withPageAuthRequired()

AppProviderBuilder.Layout = observer((page) => {
  const store = useStore()
  const { app } = useCurrentApp(store.appStore)

  return (
    <BuilderContext>
      <ElementGraphProvider elementId={app?.rootProviderElement?.id}>
        <BuilderDashboardTemplate
          Header={() => <PageDetailHeader pages={store.pageStore} />}
          MainPane={MainPaneBuilder}
          MetaPane={MetaPaneBuilderPage}
          SidebarNavigation={BuilderSidebarNavigation}
          headerHeight={38}
        >
          {page.children}
        </BuilderDashboardTemplate>
      </ElementGraphProvider>
    </BuilderContext>
  )
})
