import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderMainPane,
  BuilderSidebarNavigation,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
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

  // Load the pages list for the top bar
  useStatefulExecutor(
    () => store.pageService.getAll({ app: { id: currentAppId } }),
    { executeOnMount: true },
  )

  const [, { isLoading, error }] = useStatefulExecutor(
    async () => {
      // Load the page we're rendering
      const page = await store.pageService.getOne(currentPageId)

      if (!page) {
        throw new Error('Page not found')
      }

      // Get provider tree
      const providerTree = await store.providerElementService.getTree(
        page.providerElement.id,
      )

      // initialize renderer
      await store.builderService.builderRenderer.init(
        store.elementService.elementTree,
        store.providerElementService.elementTree,
        null,
      )

      return { page, providerTree }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{app?.name} | Provider Builder | Codelab</title>
      </Head>

      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}

      <Builder
        builderService={store.builderService}
        elementService={store.providerElementService}
        userService={store.userService}
      />
    </>
  )
})

export default AppProviderBuilder

export const getServerSideProps = withPageAuthRequired()

AppProviderBuilder.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext
      builderService={store.builderService}
      elementService={store.providerElementService}
    >
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pageService={store.pageService} />}
        MainPane={observer(() => (
          <BuilderMainPane
            atomService={store.atomService}
            builderService={store.builderService}
            componentService={store.componentService}
            detachedElementService={store.detachedElementService}
            elementService={store.providerElementService}
            userService={store.userService}
          />
        ))}
        MetaPane={observer(() => (
          <MetaPaneBuilderPage
            atomService={store.atomService}
            builderService={store.builderService}
            detachedElementService={store.detachedElementService}
            elementService={store.providerElementService}
            typeService={store.typeService}
          />
        ))}
        SidebarNavigation={observer(() => (
          <BuilderSidebarNavigation
            builderTab={store.builderService.builderTab}
            setBuilderTab={store.builderService.setBuilderTab}
          />
        ))}
        builderService={store.builderService}
        headerHeight={38}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})
