import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import {
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AppProviderBuilder: CodelabPage<any> = observer(() => {
  const store = useStore()
  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()
  const { app } = useCurrentApp(store.appService)
  // const { elementTree } = useElementGraphContext()

  if (!app) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{app?.name} | Provider Builder | Codelab</title>
      </Head>
      {/* <Builder tree={elementTree} typeService={store.typeService} />*/}
    </>
  )
})

export default AppProviderBuilder

export const getServerSideProps = withPageAuthRequired()

AppProviderBuilder.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext elementService={store.elementService}>
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pages={store.pageService} />}
        MainPane={observer(() => (
          <MainPaneBuilder atomService={store.atomService} />
        ))}
        MetaPane={observer(() => (
          <MetaPaneBuilderPage
            atomService={store.atomService}
            typeService={store.typeService}
          />
        ))}
        SidebarNavigation={BuilderSidebarNavigation}
        headerHeight={38}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})
