import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BaseBuilderProps,
  Builder,
  BuilderComponent,
  BuilderContext,
  BuilderExplorerPane,
  ConfigPane,
  EditorPaneBuilder,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import { createMobxState } from '@codelab/frontend/modules/store'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  appMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { RendererTab } from '@codelab/shared/abstract/core'
import { Alert, Spin, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const { TabPane } = Tabs

const PageBuilder: CodelabPage = observer(() => {
  const {
    pageService,
    appService,
    elementService,
    componentService,
    storeService,
    typeService,
    builderService,
    builderRenderService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const router = useRouter()

  const [, { isLoading, error, data, isDone }] = useStatefulExecutor(
    async () => {
      // load all apps to provide them to mobxState
      const apps = await appService.getAll()
      // load all pages to provide them to mobxState
      const pages = await pageService.getAll()
      const app = appService.app(appId)
      const page = pageService.page(pageId)

      if (!page) {
        throw new Error('Page not found')
      }

      const appStore = app?.store?.id
        ? await storeService.getOne(app.store.id)
        : null

      // components are needed to build pageElementTree
      // therefore they must be loaded first
      const components = await componentService.loadComponentTrees()

      /**
       * Construct the ElementTree's for
       *
       * - page tree
       * - provider tree
       */
      const [pageElementTree, providerTree, types] = await Promise.all([
        page.initTree(page.rootElement.id),
        app.initTree(app.rootElement.id),
        typeService.getAll(),
      ])

      const renderer = await builderRenderService.addRenderer(
        pageId,
        pageElementTree,
        null,
        createMobxState(appStore, apps, pages, router),
      )

      return {
        page,
        pageElementTree,
        providerTree,
        storeTree: appStore,
        types,
        components,
        renderer,
      }
    },
    { executeOnMount: true },
  )

  const activeComponent = builderService.activeComponent

  const BaseBuilder = observer<BaseBuilderProps>(
    ({ elementTree, renderer }) => (
      <Builder
        currentDragData={builderService.currentDragData}
        deleteModal={elementService.deleteModal}
        elementTree={elementTree}
        key={renderer.pageTree?.current.root?.id}
        rendererProps={{
          renderRoot: renderer.renderRoot.bind(renderer),
        }}
        selectedNode={builderService.selectedNode}
        set_hoveredNode={builderService.set_hoveredNode.bind(builderService)}
        set_selectedNode={builderService.set_selectedNode.bind(builderService)}
      />
    ),
  )

  return (
    <>
      <Head>
        <title>{data?.page?.name} | Builder | Codelab</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      <Tabs
        activeKey={builderService.activeTree}
        defaultActiveKey={RendererTab.Page}
        onChange={(key) => console.log(key)}
        type="card"
      >
        <TabPane key={RendererTab.Page} tab="Page">
          {data?.pageElementTree && isDone && data.renderer ? (
            <BaseBuilder
              elementTree={data.pageElementTree}
              renderer={data.renderer}
            />
          ) : null}
        </TabPane>
        <TabPane
          key={RendererTab.Component}
          style={{ height: '100%' }}
          tab="Component"
        >
          {activeComponent ? (
            <BuilderComponent
              BaseBuilder={BaseBuilder}
              builderService={builderService}
              componentId={activeComponent.id}
              componentService={componentService}
              renderService={builderRenderService}
            />
          ) : null}
        </TabPane>
      </Tabs>
    </>
  )
})

export const getServerSideProps = withPageAuthRequired({})

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
  } = useStore()

  const pageId = useCurrentPageId()
  const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
  const activeElementTree = builderService.activeElementTree

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      <DashboardTemplate
        ConfigPane={
          !activeElementTree || !pageBuilderRenderer
            ? undefined
            : observer(() => {
                return (
                  <ConfigPane
                    atomService={atomService}
                    builderService={builderService}
                    componentService={componentService}
                    elementService={elementService}
                    // The element tree changes depending on whether a page or a component is selected
                    elementTree={activeElementTree}
                    key={pageBuilderRenderer?.pageTree?.current.root?.id}
                    renderService={pageBuilderRenderer}
                    typeService={typeService}
                  />
                )
              })
        }
        EditorPane={({ resizable }) => (
          <EditorPaneBuilder resizable={resizable} />
        )}
        ExplorerPane={() => (
          <BuilderExplorerPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            key={pageBuilderRenderer?.pageTree?.current.root?.id}
            pageId={pageId}
            renderService={builderRenderService}
            userService={userService}
          />
        )}
        Header={() => <PageDetailHeader pageService={pageService} />}
        SidebarNavigation={() => (
          <SidebarNavigation
            primaryItems={[appMenuItem, storeMenuItem, resourceMenuItem]}
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
        // Depending on pageBuilderRenderService causes an extra re-render
        // key={pageBuilderRenderService.tree?.id}
      >
        {page.children}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
