import { elementRef, RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
} from '@codelab/frontend/domain/builder'
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
import React, { useEffect, useMemo } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const {
    componentService,
    elementService,
    builderService,
    builderRenderService,
  } = useStore()

  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const { value, error, loading } = useRenderedPage({
    appId,
    pageId,
    rendererType: RendererType.PageBuilder,
    renderService: builderRenderService,
  })

  useEffect(() => {
    /**
     * Select root element for current page
     */
    if (value?.page) {
      const pageRootElement = elementService.maybeElement(
        value.page.rootElement.id,
      )

      if (pageRootElement) {
        builderService.selectPageElementTreeNode(elementRef(pageRootElement))
      }
    }
  }, [value?.page])

  return (
    <>
      <Head>
        <title>{value?.page.name} | Builder | Codelab</title>
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

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

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
