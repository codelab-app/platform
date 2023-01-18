import type { IPageProps } from '@codelab/frontend/abstract/core'
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
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import type { UseResizable } from '@codelab/frontend/view/components'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useMemo } from 'react'
import { useAsync } from 'react-use'

const PageBuilder: CodelabPage<IPageProps> = observer(
  ({ getServerSidePropsData }) => {
    const {
      componentService,
      appService,
      builderRenderService,
      elementService,
      builderService,
    } = useStore()

    const appId = useCurrentAppId()
    const pageId = useCurrentPageId()

    const { value: pageDataValue, error: pageDataError } = useRenderedPage({
      appId,
      pageId,
    })

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

      appStore.state.setMany(appService.appsJson)

      if (getServerSidePropsData) {
        appStore.state.setMany(getServerSidePropsData)
      }

      return {
        pageTree,
        appStore,
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
  },
)

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

  const ConfigPaneComponent = useMemo(
    () =>
      observer(() => (
        <ConfigPane
          // The element tree changes depending on whether a page or a component is selected
          elementTree={activeElementTree}
          key={pageBuilderRenderer?.pageTree?.current.root?.id}
          renderService={pageBuilderRenderer}
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

  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
      elementTree={activeElementTree}
    >
      <DashboardTemplate
        ConfigPane={ConfigPaneComponent}
        EditorPane={EditorPaneComponent}
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
