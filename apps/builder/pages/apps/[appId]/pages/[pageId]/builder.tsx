import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
} from '@codelab/frontend/domain/builder'
import { elementRef } from '@codelab/frontend/domain/element'
import { PageDetailHeader } from '@codelab/frontend/domain/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useMemo } from 'react'
import { useAsync } from 'react-use'

const PageBuilder: CodelabPage = observer(() => {
  const {
    componentService,
    appService,
    builderRenderService,
    elementService,
    builderService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const {
    value: pageDataValue,
    error: pageDataError,
    loading: pageLoading,
  } = useRenderedPage({
    appId,
    pageId,
    renderService: builderRenderService,
    rendererType: RendererType.PageBuilder,
  })

  const {
    loading: renderLoading,
    value,
    error: rendererError,
  } = useAsync(async () => {
    if (!pageDataValue) {
      return {
        value: null,
        error: undefined,
        loading: pageLoading,
      }
    }

    const { page, pageTree, appTree, appStore } = pageDataValue
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
      appStore,
      rendererType: RendererType.PageBuilder,
    })

    appStore.state.setMany(appService.appsJson)

    return {
      pageTree,
      appStore,
      page,
      renderer,
    }
  }, [pageLoading])

  const error = pageDataError || rendererError
  const loading = pageLoading || renderLoading

  return (
    <>
      <Head>
        <title>{value?.page?.name} | Builder | Codelab</title>
      </Head>

      <BuilderTabs
        appStore={value?.appStore}
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

export const getServerSideProps = auth0Instance.withPageAuthRequired()

PageBuilder.Layout = observer((page) => {
  const {
    elementService,
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

  const ConfigPaneComponent = useMemo(
    () =>
      observer(() => (
        <ConfigPane
          // The element tree changes depending on whether a page or a component is selected
          elementTree={activeElementTree}
          key={activeElementTree?.root?.id}
          renderService={pageBuilderRenderer}
        />
      )),
    [pageBuilderRenderer, activeElementTree],
  )

  const ExplorerPaneComponent = useMemo(
    () =>
      observer(() => (
        <BuilderExplorerPane
          actionService={actionService}
          appStore={pageBuilderRenderer?.appStore.current}
          builderService={builderService}
          componentService={componentService}
          elementService={elementService}
          fieldService={fieldService}
          pageId={pageId}
          renderService={builderRenderService}
          resourceService={resourceService}
          storeId={pageBuilderRenderer?.appStore.id as string}
          typeService={typeService}
          userService={userService}
        />
      )),
    [pageTree, componentTree],
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

  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
      elementTree={activeElementTree}
    >
      <DashboardTemplate
        ConfigPane={ConfigPaneComponent}
        ExplorerPane={ExplorerPaneComponent}
        Header={HeaderComponent}
        contentStyles={contentStyles}
        headerHeight={48}
        sidebarNavigation={sidebarNavigation({ appId, pageId })}
      >
        {page.children}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
