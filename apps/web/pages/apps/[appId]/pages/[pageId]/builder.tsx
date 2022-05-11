import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderMainPane,
  BuilderSidebarNavigation,
  createMobxState,
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
    userService,
    detachedElementService,
  } = useStore()

  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()
  const router = useRouter()

  const [, { isLoading, error, data }] = useStatefulExecutor(
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

      /**
       * Preload all required data
       * - element tree
       * - provider tree
       * - detached elements
       */
      const [elementTree, providerTree] = await Promise.all([
        elementService.getTree(page.rootElement.id),
        providerElementService.getTree(page.providerElement.id),
        detachedElementService.getTree(app.rootDetachedElement.id),
        // elementService.loadAllDetached(),
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
        userService={userService}
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
          <BuilderMainPane
            atomService={store.atomService}
            builderService={store.builderService}
            componentService={store.componentService}
            detachedElementService={store.detachedElementService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
            userService={store.userService}
          />
        )}
        MetaPane={() => (
          <MetaPaneBuilderPage
            atomService={store.atomService}
            builderService={store.builderService}
            detachedElementService={store.detachedElementService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
            typeService={store.typeService}
          />
        )}
        SidebarNavigation={() => (
          <BuilderSidebarNavigation
            builderTab={store.builderService.builderTab}
            key={store.builderService.builderRenderer.tree?.root?.id}
            setBuilderTab={store.builderService.setBuilderTab}
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
