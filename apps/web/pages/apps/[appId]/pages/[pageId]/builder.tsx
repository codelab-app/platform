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
  MetaPane,
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

const PageBuilder: CodelabPage = observer(() => {
  const {
    pageService,
    appService,
    elementService,
    pageElementTree,
    providerElementTree,
    storeService,
    builderService,
    userService,
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
       * Construct the ElementTree's for
       *
       * - page tree
       * - provider tree
       */
      const [elementTree, providerTree] = await Promise.all([
        pageElementTree.getTree(page.rootElement.id),
        providerElementTree.getTree(page.providerElement.id),
      ])

      // initialize renderer
      await builderService.builderRenderer.init(
        pageElementTree,
        providerElementTree,
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
      {data?.elementTree && !isLoading ? (
        <Builder
          currentDragData={builderService.currentDragData}
          deleteModal={elementService.deleteModal}
          elementTree={data.elementTree}
          key={builderService.builderRenderer.tree?.root?.id}
          rendererProps={{
            isInitialized: builderService.builderRenderer.isInitialized,
            renderRoot: builderService.builderRenderer.renderRoot.bind(
              builderService.builderRenderer,
            ),
          }}
          selectedElement={builderService.selectedElement}
          setHoveredElement={builderService.setHoveredElement.bind(
            builderService,
          )}
          set_selectedElement={builderService.set_selectedElement.bind(
            builderService,
          )}
        />
      ) : null}
    </>
  )
})

export const getServerSideProps = withPageAuthRequired({})

PageBuilder.Layout = observer((page) => {
  const {
    pageElementTree,
    builderService,
    elementService,
    pageService,
    atomService,
    componentService,
    userService,
    typeService,
  } = useStore()

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pageService={pageService} />}
        MainPane={() => (
          <BuilderMainPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            key={builderService.builderRenderer.tree?.root?.id}
            pageElementTree={pageElementTree}
            userService={userService}
          />
        )}
        MetaPane={() => (
          <MetaPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            elementTree={pageElementTree}
            key={builderService.builderRenderer.tree?.root?.id}
            typeService={typeService}
          />
        )}
        SidebarNavigation={() => (
          <BuilderSidebarNavigation
            builderTab={builderService.builderTab}
            key={builderService.builderRenderer.tree?.root?.id}
            setBuilderTab={builderService.setBuilderTab}
          />
        )}
        builderService={builderService}
        headerHeight={38}
        key={builderService.builderRenderer.tree?.id}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder
