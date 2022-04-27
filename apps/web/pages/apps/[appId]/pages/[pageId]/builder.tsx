import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPane,
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

const PageBuilder: CodelabPage<any> = observer(() => {
  const store = useStore()
  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()

  // Load the pages list for the top bar
  useLoadingState(
    () => store.pageService.getAll({ app: { id: currentAppId } }),
    { executeOnMount: true },
  )

  const [, { isLoading, error, data }] = useLoadingState(
    async () => {
      const app = await store.appService.getOne(currentAppId)
      // Load the page we're rendering
      const page = await store.pageService.getOne(currentPageId)

      if (!page) {
        throw new Error('Page not found')
      }

      // Get element tree and provider tree
      const [elementTree, providerTree, storeTree] = await Promise.all([
        store.elementService.getTree(page.rootElementId),
        store.providerElementService.getTree(page.providerElementId),
        app?.store?.id ? store.storeService.getOne(app?.store?.id) : null,
      ])

      // initialize renderer
      await store.builderService.builderRenderer.init(
        store.elementService.elementTree,
        store.providerElementService.elementTree,
        app?.store?.id
          ? store.storeService.store(app?.store?.id)?.toMobxObservable()
          : null,
      )

      return { page, elementTree, providerTree, storeTree }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page?.name} | Builder | Codelab</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      <Builder
        builderService={store.builderService}
        elementService={store.elementService}
        key={store.builderService.builderRenderer.tree?.root?.id}
      />
    </>
  )
})

export const getServerSideProps = withPageAuthRequired({})

PageBuilder.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext
      builderService={store.builderService}
      elementService={store.elementService}
    >
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pageService={store.pageService} />}
        MainPane={() => (
          <MainPane
            atomService={store.atomService}
            builderService={store.builderService}
            componentService={store.componentService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
          />
        )}
        MetaPane={() => (
          <MetaPaneBuilderPage
            atomService={store.atomService}
            builderService={store.builderService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
            typeService={store.typeService}
          />
        )}
        SidebarNavigation={() => (
          <BuilderSidebarNavigation
            builderService={store.builderService}
            key={store.builderService.builderRenderer.tree?.root?.id}
          />
        )}
        builderService={store.builderService}
        headerHeight={38}
        key={store.builderService.builderRenderer.tree?.id}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder
