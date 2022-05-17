import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { setClientAuthHeaders } from '@codelab/frontend/model/infra/graphql'
import { initializeStore, useStore } from '@codelab/frontend/model/infra/mobx'
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
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import {
  AccessTokenPayload,
  APP_ID,
  IPageProps,
  PAGE_ID,
  WithUrlParams,
} from '@codelab/shared/abstract/core'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

interface PageBuilderProps extends IPageProps {
  appId: string
  pageId: string
}

const PageBuilder: CodelabPage<PageBuilderProps> = observer(
  ({ appId, pageId }) => {
    const { pageService, elementService, builderService } = useStore()
    const page = pageService.pages.get(pageId)
    const elementTree = builderService.builderRenderer.tree

    console.log(elementTree)

    return (
      <>
        <Head>
          <title>{page?.name} | Builder | Codelab</title>
        </Head>
        {elementTree ? (
          <Builder
            currentDragData={builderService.currentDragData}
            deleteModal={elementService.deleteModal}
            elementTree={elementTree}
            key={builderService.builderRenderer.tree?.root?.id}
            rendererProps={{
              isInitialized: builderService.builderRenderer.isInitialized,
              renderRoot:
                builderService.builderRenderer.renderRoot.bind(builderService),
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
  },
)

export const getServerSideProps = withPageAuthRequired<
  PageBuilderProps,
  WithUrlParams<APP_ID | PAGE_ID>
>({
  getServerSideProps: async (ctx) => {
    const { req, res, params, query } = ctx
    const session = await getSession(req, res)
    const user = session?.user as AccessTokenPayload

    // Set auth token from Next.js session, and set headers with bearer
    await setClientAuthHeaders(ctx)

    const rootStore = initializeStore({ user })
    const appId = throwIfUndefined(params?.appId)
    const pageId = throwIfUndefined(params?.pageId)
    /**
     * Here we fetch data in order to get the data for snapshot, we can't actually pass these models across to the frontend because objects can't be serialized
     */
    const apps = await rootStore.appService.getAll()
    const app = apps.find((_app) => _app.id === appId)
    const pages = await rootStore.pageService.getAll()
    const page = pages.find((_page) => _page.id === pageId)

    const store = app?.store?.id
      ? (await rootStore.storeService.getOne(app?.store?.id)) ?? null
      : null

    if (!page) {
      throw new Error('Missing page')
    }

    /**
     * Construct the ElementTree's for
     *
     * - page tree
     * - provider tree
     */
    const [pageElementTree, providerTree] = await Promise.all([
      rootStore.pageElementTree.getTree(page?.rootElement.id),
      rootStore.providerElementTree.getTree(page?.providerElement.id),
    ])

    // initialize renderer
    await rootStore.builderService.builderRenderer.init(
      rootStore.pageElementTree,
      rootStore.providerElementTree,
      createMobxState(store, apps, pages),
    )

    return {
      props: {
        snapshot: {
          appService: getSnapshot(rootStore.appService),
          pageElementTree: getSnapshot(rootStore.pageElementTree),
          pageService: getSnapshot(rootStore.pageService),
          atomService: getSnapshot(rootStore.atomService),
          elementService: getSnapshot(rootStore.elementService),
          builderService: getSnapshot(rootStore.builderService),
        },
        appId,
        pageId,
      },
    }
  },
})

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

PageBuilder.displayName = 'PageBuilder'
