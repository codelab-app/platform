import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
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
      // Load the page we're rendering
      const page = await store.pageService.getOne(currentPageId)

      if (!page) {
        throw new Error('Page not found')
      }

      // Get element tree and provider tree
      const [elementTree, providerTree] = await Promise.all([
        store.elementService.getTree(page.rootElementId),
        store.providerElementService.getTree(page.providerElementId),
      ])

      // initialize renderer
      await store.builderService.builderRenderer.init(
        store.elementService.elementTree,
        store.providerElementService.elementTree,
        null,
      )

      return { page, elementTree, providerTree }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page.name} | Builder | Codelab</title>
      </Head>

      {error && <Alert type="error">{extractErrorMessage(error)}</Alert>}
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
    <BuilderContext elementStore={store.elementStore}>
      <PageProvider pages={store.pageService}>
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
      </PageProvider>
    </BuilderContext>
  )
})

export default PageBuilder
