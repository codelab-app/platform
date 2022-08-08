import { auth0Instance } from '@codelab/backend'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderExplorerPane,
  BuilderTabs,
  ConfigPane,
  EditorPaneBuilder,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const store = useStore()
  const pageId = useCurrentPageId()

  const [, { data }] = useStatefulExecutor(
    async () => ({
      page: await store.pageService.getOne(pageId),
    }),
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page?.name} | Builder | Codelab</title>
      </Head>

      <BuilderTabs
        appService={store.appService}
        builderRenderService={store.builderRenderService}
        builderService={store.builderService}
        componentService={store.componentService}
        elementService={store.elementService}
        pageService={store.pageService}
        storeService={store.storeService}
        typeService={store.typeService}
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
              />
            ) : null}
          </>
        ))}
        EditorPane={observer(({ resizable }) => (
          <EditorPaneBuilder resizable={resizable} />
        ))}
        ExplorerPane={observer(() => (
          <BuilderExplorerPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            pageId={pageId}
            renderService={builderRenderService}
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
              storeMenuItem(appId),
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
