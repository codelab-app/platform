import { RendererType } from '@codelab/frontend/abstract/core'
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
  const { builderRenderService, builderService, elementService } = useStore()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const { error, loading, value } = useRenderedPage({
    appId,
    pageId,
    rendererType: RendererType.PageBuilder,
    renderService: builderRenderService,
  })

  useEffect(() => {
    /**
     * Select root element for current page
     */
    if (value?.page.rootElement) {
      const pageRootElement = elementService.maybeElement(
        value.page.rootElement.id,
      )

      if (pageRootElement) {
        builderService.selectElementNode(pageRootElement)
      }
    }
  }, [value?.page])

  return (
    <>
      <Head>
        <title>{value?.page.name} | Builder | Codelab</title>
      </Head>

      <BuilderTabs
        app={value?.app}
        error={error?.message}
        isLoading={loading}
        page={value?.page}
        renderer={value?.renderer}
      />
    </>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

PageBuilder.Layout = observer((page) => {
  const { builderRenderService, builderService, elementService, pageService } =
    useStore()

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
          appStore={pageBuilderRenderer?.appStore.current}
          pageId={pageId}
          storeId={pageBuilderRenderer?.appStore.id as string}
        />
      )),
    [pageBuilderRenderer, pageId],
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
