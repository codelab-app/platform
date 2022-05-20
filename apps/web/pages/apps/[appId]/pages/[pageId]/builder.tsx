import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  BaseBuilderProps,
  Builder,
  BuilderComponent,
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
    pageElementTree,
    providerElementTree,
    pageBuilderRenderService,
    componentService,
    componentBuilderRenderService,
    storeService,
    typeService,
    componentService,
    builderService,
  } = useStore()

  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()
  const router = useRouter()

  const [, { isLoading, error, data, isDone }] = useStatefulExecutor(
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

      // components are needed to build pageElementTree
      // therefore they must be loaded first
      const components = await componentService.loadComponentTrees()

      /**
       * Construct the ElementTree's for
       *
       * - page tree
       * - provider tree
       */
      const [elementTree, providerTree, types] = await Promise.all([
        pageElementTree.getTree(page.rootElement.id),
        providerElementTree.getTree(page.providerElement.id),
        typeService.getAll(),
      ])

      await pageBuilderRenderService.init(
        pageElementTree,
        providerElementTree,
        createMobxState(storeTree, apps, pages, router),
      )

      return {
        page,
        pageElementTree,
        providerTree,
        storeTree,
        types,
        components,
      }
    },
    { executeOnMount: true },
  )

  const currentComponentId = builderService.selectedComponentRef?.current.id

  const BaseBuilder = observer<BaseBuilderProps>(
    ({ elementTree, renderService }) => (
      <Builder
        currentDragData={builderService.currentDragData}
        deleteModal={elementService.deleteModal}
        elementTree={elementTree}
        key={renderService.tree?.root?.id}
        rendererProps={{
          isInitialized: renderService.isInitialized,
          renderRoot: renderService.renderRoot.bind(renderService),
        }}
        selectedElement={builderService.selectedElement}
        setHoveredElement={builderService.setHoveredElement.bind(
          builderService,
        )}
        setSelectedTreeNode={builderService.setSelectedTreeNode.bind(
          builderService,
        )}
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
          {data?.pageElementTree && !isDone ? (
            <BaseBuilder
              elementTree={data.pageElementTree}
              renderService={pageBuilderRenderService}
            />
          ) : null}
        </TabPane>
        <TabPane
          key={RendererTab.Component}
          style={{ height: '100%' }}
          tab="Component"
        >
          {builderService.selectedComponentRef?.current.id}
          {currentComponentId ? (
            <BuilderComponent
              BaseBuilder={BaseBuilder}
              componentBuilderRenderService={componentBuilderRenderService}
              componentId={currentComponentId}
              componentService={componentService}
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
    pageElementTree,
    builderService,
    elementService,
    pageService,
    atomService,
    componentService,
    pageBuilderRenderService,
    userService,
    typeService,
    componentBuilderRenderService,
  } = useStore()

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pageService={pageService} />}
        MainPane={() => {
          return (
            <BuilderMainPane
              atomService={atomService}
              builderService={builderService}
              componentBuilderRenderService={componentBuilderRenderService}
              componentService={componentService}
              elementService={elementService}
              key={pageBuilderRenderService.tree?.root?.id}
              pageBuilderRenderService={pageBuilderRenderService}
              pageElementTree={pageElementTree}
              userService={userService}
            />
          )
        }}
        MetaPane={() => (
          <MetaPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            // The element tree changes depending on whether a page or a component is selected
            elementTree={pageElementTree}
            key={pageBuilderRenderService.tree?.root?.id}
            renderService={pageBuilderRenderService}
            typeService={typeService}
          />
        )}
        SidebarNavigation={() => (
          <BuilderSidebarNavigation
            builderService={builderService}
            key={pageBuilderRenderService.tree?.root?.id}
          />
        )}
        headerHeight={38}
        // Depending on pageBuilderRenderService causes an extra re-render
        // key={pageBuilderRenderService.tree?.id}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.whyDidYouRender = true

PageBuilder.displayName = 'PageBuilder'
