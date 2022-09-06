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
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'

const PageBuilder: CodelabPage = observer(() => {
  const {
    appService,
    componentService,
    typeService,
    builderRenderService,
    elementService,
    builderService,
  } = useStore()

  const router = useRouter()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const { loading, value, error } = useAsync(async () => {
    const {
      apps,
      components,
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
    } = await builderService.getPageBuilder({ appId, pageId })

    const { pageElementTree, app, page, store } = appService.load({
      app: apps[0],
      pageId,
    })

    const types = typeService.load({
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

    const hydratedComponents = components.map((component) =>
      componentService.writeCache(component),
    )

    const hydratedComponentsWithElementTree =
      await componentService.loadComponentTrees(hydratedComponents)

    /**
     *
     * page Element tree
     *
     */
    const pageRootElement = elementService.element(page.rootElement.id)

    if (pageRootElement) {
      builderService.set_selectedNode(elementRef(pageRootElement))
    }

    const renderer = await builderRenderService.addRenderer(
      pageId,
      pageElementTree,
      null,
      store,
      createMobxState(store, [app], [page], router),
      true,
    )

    return {
      page,
      pageElementTree,
      providerTree: null,
      store,
      types,
      components: hydratedComponentsWithElementTree,
      renderer,
    }
  }, [])

  return (
    <>
      <Head>
        <title>{value?.page?.name} | Builder | Codelab</title>
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
    storeService,
    resourceService,
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
          <>
            {pageBuilderRenderer?.appStore?.current && (
              <EditorPaneBuilder
                actionService={actionService}
                appStore={pageBuilderRenderer.appStore.current}
                resizable={resizable}
                resourceService={resourceService}
                state={pageBuilderRenderer?.platformState}
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
