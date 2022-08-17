import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
  EditorPaneBuilder,
} from '@codelab/frontend/modules/builder'
import { elementRef } from '@codelab/frontend/modules/element'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import { createMobxState } from '@codelab/frontend/modules/store'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const {
    appService,
    storeService,
    pageService,
    componentService,
    typeService,
    builderRenderService,
    elementService,
    builderService,
    userService,
  } = useStore()

  const router = useRouter()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const [, { data, error, isLoading }] = useStatefulExecutor(
    async () => {
      /**
       *
       * load all apps to provide them to mobxState
       */
      const apps = await appService.getAll()
      const app = appService.app(appId)
      /**
       *
       * load app store
       *
       */
      const appStore = await storeService.getOne(app.store.id)

      if (!appStore) {
        throw new Error('App store not found')
      }

      /**
       *
       * load all pages to provide them to mobxState
       *
       * */
      const pages = await pageService.getAll()
      const page = pageService.page(pageId)

      if (!page) {
        throw new Error('Page not found')
      }

      /**
       *
       * components are needed to build pageElementTree
       *
       */
      const components = await componentService.loadComponentTrees(
        userService.auth0Id,
      )

      /**
       *
       * load all types
       *
       */
      const types = await typeService.getAll()
      /**
       *
       * construct provider tree
       *
       */
      const providerTree = await app.initTree(app.rootElement.id)
      /**
       *
       * page Element tree
       *
       */
      const pageElementTree = await page.initTree(page.rootElement.id)
      const pageRootElement = elementService.element(page.rootElement.id)

      if (pageRootElement) {
        builderService.set_selectedNode(elementRef(pageRootElement))
      }

      const renderer = await builderRenderService.addRenderer(
        pageId,
        pageElementTree,
        providerTree,
        appStore,
        createMobxState(appStore, apps, pages, router),
        true,
      )

      return {
        page,
        pageElementTree,
        providerTree,
        appStore,
        types,
        components,
        renderer,
      }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page?.name} | Builder | Codelab</title>
      </Head>

      <BuilderTabs
        appStore={data?.appStore}
        builderRenderService={builderRenderService}
        builderService={builderService}
        componentService={componentService}
        elementService={elementService}
        elementTree={data?.pageElementTree}
        error={error}
        isLoading={isLoading}
        renderer={data?.renderer}
      />
    </>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

PageBuilder.Layout = observer((page) => {
  const {
    elementService,
    pageService,
    atomService,
    componentService,
    userService,
    builderService,
    typeService,
    builderRenderService,
    actionService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
  const activeElementTree = builderService.activeElementTree

  useEffect(() => {
    userService.user?.setCurAppId(appId)
    userService.user?.setCurPageId(pageId)
  }, [appId, pageId])

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      <DashboardTemplate
        ConfigPane={observer(() => (
          <>
            {activeElementTree && pageBuilderRenderer ? (
              <ConfigPane
                actionService={actionService}
                atomService={atomService}
                builderService={builderService}
                componentService={componentService}
                elementService={elementService}
                // The element tree changes depending on whether a page or a component is selected
                elementTree={activeElementTree}
                key={pageBuilderRenderer?.pageTree?.current.root?.id}
                renderService={pageBuilderRenderer}
                typeService={typeService}
                userService={userService}
              />
            ) : null}
          </>
        ))}
        EditorPane={observer(({ resizable }) => (
          <EditorPaneBuilder resizable={resizable} />
        ))}
        ExplorerPane={observer(() => (
          <BuilderExplorerPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            pageId={pageId}
            renderService={builderRenderService}
            userService={userService}
          />
        ))}
        Header={observer(() => (
          <PageDetailHeader pageService={pageService} />
        ))}
        SidebarNavigation={() => (
          <SidebarNavigation
            primaryItems={[
              appMenuItem,
              allPagesMenuItem(appId),
              pageBuilderMenuItem(appId, pageId),
              storeMenuItem(appId),
              resourceMenuItem,
            ]}
            secondaryItems={adminMenuItems}
            // activeBuilderTab={builderService.activeBuilderTab}
            // key={pageBuilderRenderer?.pageTree?.current.root?.id}
            // setActiveBuilderTab={builderService.setActiveBuilderTab.bind(
            //   builderService,
            // )}
          />
        )}
        contentStyles={{ paddingTop: '0rem' }}
        headerHeight={38}
        key={pageBuilderRenderer?.pageTree?.current.root?.id}
      >
        {page.children}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
