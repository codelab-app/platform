import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
  EditorPaneBuilder,
} from '@codelab/frontend/domain/builder'
import { elementRef } from '@codelab/frontend/domain/element'
import { Page, PageDetailHeader } from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'

const PageBuilder: CodelabPage = observer(() => {
  const {
    userService,
    appService,
    typeService,
    componentService,
    builderRenderService,
    elementService,
    builderService,
    resourceService,
    pageService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const { loading, value, error } = useAsync(async () => {
    const {
      apps,
      components,
      resources,
      // Can't change shape in GraphQL so we have to use this structure
      primitiveTypes,
      arrayTypes,
      unionTypes,
      interfaceTypes,
      elementTypes,
      renderPropsTypes,
      reactNodeTypes,
      enumTypes,
      lambdaTypes,
      pageTypes,
      appTypes,
      actionTypes,
      codeMirrorTypes,
    } = await pageService.getRenderedPage(appId, pageId)

    if (!apps[0]) {
      return
    }

    const { pageElementTree, page, store } = appService.load({
      app: apps[0],
      pageId,
    })

    typeService.load({
      primitiveTypes,
      arrayTypes,
      unionTypes,
      interfaceTypes,
      elementTypes,
      renderPropsTypes,
      reactNodeTypes,
      enumTypes,
      lambdaTypes,
      pageTypes,
      appTypes,
      actionTypes,
      codeMirrorTypes,
    })

    components.map((component) =>
      componentService.loadRenderedComponentTree(component),
    )

    resources.map((resource) => resourceService.writeCache(resource))

    /**
     *
     * page Element tree
     *
     */
    const pageRootElement = elementService.element(page.rootElement.id)

    if (pageRootElement) {
      builderService.selectPageElementTreeNode(elementRef(pageRootElement))
    }

    store.initState(appService.appsList)

    const renderer = await builderRenderService.addRenderer({
      id: pageId,
      pageTree: pageElementTree,
      appTree: null,
      appStore: store,
      isBuilder: true,
    })

    return {
      pageElementTree,
      store,
      page,
      renderer,
    }
  }, [])

  return (
    <>
      <Head>
        <title>{value?.page.name} | Builder | Codelab</title>
      </Head>

      <BuilderTabs
        appStore={value?.store}
        builderRenderService={builderRenderService}
        builderService={builderService}
        componentService={componentService}
        elementService={elementService}
        elementTree={value?.pageElementTree}
        error={error?.message}
        isLoading={loading}
        renderer={value?.renderer}
      />
    </>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired({
  getServerSideProps: Page.getServerSideProps,
})

PageBuilder.Layout = observer((page) => {
  const {
    elementService,
    atomService,
    componentService,
    userService,
    builderService,
    builderRenderService,
    actionService,
    resourceService,
    appService,
    typeService,
    storeService,
    pageService,
    fieldService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const pageBuilderRenderer = builderRenderService.renderers.get(pageId)
  const activeElementTree = builderService.activeElementTree
  // should be defined by the time, components list renders
  const pageTree = pageBuilderRenderer?.pageTree?.current

  useEffect(() => {
    userService.user?.setCurAppId(appId)
    userService.user?.setCurPageId(pageId)
  }, [appId, pageId])

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
      elementTree={pageTree}
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
                key={pageBuilderRenderer.pageTree?.current.root?.id}
                renderService={pageBuilderRenderer}
                typeService={typeService}
                userService={userService}
              />
            ) : null}
          </>
        ))}
        EditorPane={observer(({ resizable }) => (
          <>
            {pageBuilderRenderer?.appStore?.current && (
              <EditorPaneBuilder
                actionService={actionService}
                appStore={pageBuilderRenderer.appStore.current}
                fieldService={fieldService}
                resizable={resizable}
                resourceService={resourceService}
                storeService={storeService}
                typeService={typeService}
              />
            )}
          </>
        ))}
        ExplorerPane={observer(() => (
          <BuilderExplorerPane
            actionService={actionService}
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            pageId={pageId}
            renderService={builderRenderService}
            storeId={pageBuilderRenderer?.appStore?.id as string}
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
        headerHeight={48}
      >
        {page.children}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
