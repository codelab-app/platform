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
import { createMobxState } from '@codelab/frontend/modules/store'
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
  ContentSection,
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
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PageBuilder: CodelabPage = observer(() => {
  const {
    appService,
    pageService,
    storeService,
    builderService,
    elementService,
    componentService,
    builderRenderService,
    typeService,
    userService,
  } = useStore()

  const appId = useCurrentAppId()
  const router = useRouter()

  const [, { data, isLoading, error }] = useStatefulExecutor(
    async () => {
      /**
       *
       * load all apps to provide them to mobxState
       */
      const apps = await appService.getAll()
      const app = appService.app(appId)
      const pages = await pageService.getAll()
      /**
       *
       * load app store
       *
       */
      const appStore = await storeService.getOne(app.store.id)

      if (!appStore) {
        throw new Error('App store not found')
      }

      /**
       *
       * components are needed to build pageElementTree
       *
       */
      const components = await componentService.loadComponentTrees(
        userService.auth0Id,
      )

      /**
       *
       * load all types
       *
       */
      const types = await typeService.getAll()
      /**
       *
       * construct provider tree
       *
       */
      const providerTree = await app.initTree(app.rootElement.id)

      const renderer = await builderRenderService.addRenderer(
        appId,
        providerTree,
        null,
        appStore,
        createMobxState(appStore, apps, pages, router),
        true,
      )

      return {
        providerTree,
        appStore,
        types,
        app,
        components,
        renderer,
      }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.app?.name} | Provider Builder | Codelab</title>{' '}
      </Head>

      <ContentSection>
        <BuilderTabs
          appStore={data?.appStore}
          builderRenderService={builderRenderService}
          builderService={builderService}
          componentService={componentService}
          elementService={elementService}
          elementTree={data?.providerTree}
          error={error}
          isLoading={isLoading}
          renderer={data?.renderer}
        />
      </ContentSection>
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
  const appBuilderRenderer = builderRenderService.renderers.get(appId)
  const activeElementTree = appBuilderRenderer?.appTree?.current

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
            {activeElementTree && appBuilderRenderer ? (
              <ConfigPane
                actionService={actionService}
                atomService={atomService}
                builderService={builderService}
                componentService={componentService}
                elementService={elementService}
                // The element tree changes depending on whether a page or a component is selected
                elementTree={activeElementTree}
                key={appBuilderRenderer?.pageTree?.current.root?.id}
                renderService={appBuilderRenderer}
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
            pageId={appId}
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
          />
        )}
        contentStyles={{ paddingTop: '0rem' }}
        headerHeight={38}
        key={activeElementTree?.id}
      >
        {page.children}
      </DashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
