import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  createMobxState,
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
import { useRouter } from 'next/router'
import React from 'react'

const PageBuilder: CodelabPage<any> = observer(() => {
  const {
    pageService,
    appService,
    elementService,
    providerElementService,
    storeService,
    builderService,
  } = useStore()

  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()
  const router = useRouter()

  const [, { isLoading, error, data }] = useLoadingState(
    async () => {
      // load all apps to provide them to mobxState
      const apps = await appService.getAll()
      // load all pages to provide them to mobxState
      const pages = await pageService.getAll()
      const app = appService.app(currentAppId)
      const page = pageService.page(currentPageId)

      if (!page) {
        throw new Error('Page not found')
      }

      const storeTree = app?.store?.id
        ? await storeService.getOne(app.store.id)
        : null

      // Get element tree and provider tree
      const [elementTree, providerTree] = await Promise.all([
        elementService.getTree(page.rootElementId),
        providerElementService.getTree(page.providerElementId),
      ])

      // initialize renderer
      await builderService.builderRenderer.init(
        elementService.elementTree,
        providerElementService.elementTree,
        createMobxState(storeTree, apps, pages, router),
      )

      return {
        page,
        elementTree,
        providerTree,
        storeTree,
      }
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
        builderService={builderService}
        elementService={elementService}
        key={builderService.builderRenderer.tree?.root?.id}
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
