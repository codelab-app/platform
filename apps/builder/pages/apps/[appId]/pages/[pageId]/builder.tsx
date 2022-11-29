import type { CodelabPage } from '@codelab/frontend/abstract/types'
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
  useLoadRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import type { UseResizable } from '@codelab/frontend/view/components'
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
import React, { useEffect, useMemo } from 'react'
import { useAsync } from 'react-use'

const PageBuilder: CodelabPage = observer(() => {
  const {
    componentService,
    builderRenderService,
    elementService,
    builderService,
  } = useStore()

  const { value: pageDataValue, error: pageDataError } = useLoadRenderedPage()

  const {
    loading,
    value,
    error: rendererError,
  } = useAsync(async () => {
    if (!pageDataValue) {
      return
    }

    const { page, pageTree, appTree, appStore, components } = pageDataValue
    /**
     *
     * page Element tree
     *
     */
    const pageRootElement = elementService.element(page.rootElement.id)

    if (pageRootElement) {
      builderService.selectPageElementTreeNode(elementRef(pageRootElement))
    }

    const renderer = await builderRenderService.addRenderer({
      id: page.id,
      pageTree,
      appTree,
      components,
      appStore,
      isBuilder: true,
    })

    return {
      pageTree,
      store: appStore,
      page,
      renderer,
    }
  }, [pageDataValue])

  const error = pageDataError || rendererError

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
        elementTree={value?.pageTree}
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
    typeService,
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

  const ConfigPaneComponent = useMemo(
    () =>
      observer(() => (
        <ConfigPane
          actionService={actionService}
          atomService={atomService}
          builderService={builderService}
          componentService={componentService}
          elementService={elementService}
          // The element tree changes depending on whether a page or a component is selected
          elementTree={activeElementTree}
          key={pageBuilderRenderer?.pageTree?.current.root?.id}
          pageId={pageId}
          renderService={pageBuilderRenderer}
          typeService={typeService}
          userService={userService}
        />
      )),
    [pageBuilderRenderer, builderService],
  )

  const EditorPaneComponent = useMemo(
    () =>
      observer(({ resizable }: { resizable: UseResizable }) => (
        <EditorPaneBuilder
          actionService={actionService}
          appStore={pageBuilderRenderer?.appStore.current}
          fieldService={fieldService}
          resizable={resizable}
          resourceService={resourceService}
          typeService={typeService}
        />
      )),
    [pageBuilderRenderer],
  )

  const ExplorerPaneComponent = useMemo(
    () =>
      observer(() => (
        <BuilderExplorerPane
          actionService={actionService}
          builderService={builderService}
          componentService={componentService}
          elementService={elementService}
          pageId={pageId}
          renderService={builderRenderService}
          storeId={pageBuilderRenderer?.appStore.id as string}
          userService={userService}
        />
      )),
    [pageBuilderRenderer, builderService],
  )

  const HeaderComponent = useMemo(
    () =>
      observer(() => (
        <PageDetailHeader
          builderService={builderService}
          pageService={pageService}
        />
      )),
    [],
  )

  const SidebarNavigationComponent = useMemo(
    () => () =>
      (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(appId),
            pageBuilderMenuItem(appId, pageId),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      ),
    [],
  )

  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
      elementTree={pageTree}
    >
      <DashboardTemplate
        ConfigPane={ConfigPaneComponent}
        EditorPane={EditorPaneComponent}
        ExplorerPane={ExplorerPaneComponent}
        Header={HeaderComponent}
        SidebarNavigation={SidebarNavigationComponent}
        contentStyles={contentStyles}
        headerHeight={48}
      >
        {page.children}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
