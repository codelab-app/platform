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
import { IElementTree, RendererTab } from '@codelab/shared/abstract/core'
import { Alert, Spin, Tabs } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const { TabPane } = Tabs

type BaseBuilderProps = {
  elementTree: IElementTree
}

const PageBuilder: CodelabPage = observer(() => {
  const {
    pageService,
    appService,
    elementService,
    pageElementTree,
    providerElementTree,
    pageBuilderRenderService,
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

  const BaseBuilder = observer<BaseBuilderProps>(({ elementTree }) => (
    <Builder
      currentDragData={builderService.currentDragData}
      deleteModal={elementService.deleteModal}
      elementTree={elementTree}
      key={pageBuilderRenderService.tree?.root?.id}
      rendererProps={{
        isInitialized: pageBuilderRenderService.isInitialized,
        renderRoot: pageBuilderRenderService.renderRoot.bind(
          pageBuilderRenderService,
        ),
      }}
      selectedElement={builderService.selectedElement}
      setHoveredElement={builderService.setHoveredElement.bind(builderService)}
      setSelectedTreeNode={builderService.setSelectedTreeNode.bind(
        builderService,
      )}
    />
  ))

  return (
    <>
      <Head>
        <title>{data?.page?.name} | Builder | Codelab</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      <Tabs activeKey={builderService.activeTree} type="card">
        <TabPane key={RendererTab.Page} tab="Page">
          {isDone && data?.pageElementTree ? (
            <BaseBuilder elementTree={data.pageElementTree} />
          ) : null}
        </TabPane>
        <TabPane key={RendererTab.Component} tab="Component">
          {builderService.selectedComponentRef?.current.id}
          {/* {data?.elementTree && !isLoading ? ( */}
          {/*  <BaseBuilder elementTree={data.elementTree} /> */}
          {/* ) : null} */}
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
        MainPane={() => (
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
        )}
        MetaPane={() => (
          <MetaPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            elementTree={pageElementTree}
            key={pageBuilderRenderService.tree?.root?.id}
            renderService={pageBuilderRenderService}
            typeService={typeService}
          />
        )}
        SidebarNavigation={() => (
          <BuilderSidebarNavigation
            builderTab={builderService.builderTab}
            key={pageBuilderRenderService.tree?.root?.id}
            setBuilderTab={builderService.setBuilderTab}
          />
        )}
        builderService={builderService}
        headerHeight={38}
        key={pageBuilderRenderService.tree?.id}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder
