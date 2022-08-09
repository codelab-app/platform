import { elementRef } from '@codelab/frontend/modules/element'
import { createMobxState } from '@codelab/frontend/modules/store'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import {
  IAppService,
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IPageService,
  IRenderer,
  IRenderService,
  IStore,
  IStoreService,
  RendererTab,
} from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { Alert, Layout, Spin, Tabs } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { BaseBuilder } from './BaseBuilder'
import { BuilderComponent } from './Builder-Component'

export interface BuilderTabsProps {
  appService: IAppService
  pageService: IPageService
  storeService: IStoreService
  builderService: IBuilderService
  elementService: IElementService
  elementTree: Maybe<IElementTree>
  componentService: IComponentService
  builderRenderService: IRenderService
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({
    appService,
    pageService,
    storeService,
    builderService,
    elementTree,
    elementService,
    componentService,
    builderRenderService,
  }) => {
    const router = useRouter()
    const appId = useCurrentAppId()
    const pageId = useCurrentPageId()

    const [, { data, error, isLoading }] = useStatefulExecutor(
      async () => {
        /**
         *
         * load all apps to provide them to mobxState
         */
        const apps = await appService.getAll()
        const app = appService.app(appId)
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
         * load all pages to provide them to mobxState
         *
         * */
        const pages = await pageService.getAll()
        const page = pageService.page(pageId)

        if (!page) {
          throw new Error('Page not found')
        }

        /**
         *
         * components are needed to build pageElementTree
         *
         */
        const components = await componentService.loadComponentTrees()
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
        /**
         *
         * page Element tree
         *
         */
        const pageElementTree = await page.initTree(page.rootElement.id)
        const pageRootElement = elementService.element(page.rootElement.id)

        if (pageRootElement) {
          builderService.set_selectedNode(elementRef(pageRootElement))
        }

        const renderer = await builderRenderService.addRenderer(
          pageId,
          pageElementTree,
          appStore,
          providerTree,
          createMobxState(appStore, apps, pages, router),
          true,
        )

        return {
          page,
          pageElementTree,
          providerTree,
          appStore,
          types,
          components,
          renderer,
        }
      },
      { executeOnMount: true },
    )

    return (
      <Layout style={{ height: '100%' }}>
        {error && <Alert message={extractErrorMessage(error)} type="error" />}
        {isLoading && <Spin />}
        <Header style={{ background: 'rgba(0,0,0,0)', marginBottom: '5px' }}>
          <Tabs
            activeKey={builderService.activeTree}
            defaultActiveKey={RendererTab.Page}
            onChange={(key) => console.log(key)}
            type="card"
          >
            <Tabs.TabPane key={RendererTab.Page} tab="Page" />
            <Tabs.TabPane key={RendererTab.Component} tab="Component" />
          </Tabs>
        </Header>
        <Content>
          {builderService.activeTree === RendererTab.Page ? (
            elementTree && renderer ? (
              <BaseBuilder
                builderService={builderService}
                elementService={elementService}
                elementTree={elementTree}
                renderer={renderer}
              />
            ) : null
          ) : builderService.activeComponent && appStore ? (
            <BuilderComponent
              BaseBuilder={BaseBuilder}
              appStore={appStore}
              builderService={builderService}
              componentId={builderService.activeComponent.id}
              componentService={componentService}
              elementService={elementService}
              renderService={builderRenderService}
            />
          ) : null}
        </Content>
      </Layout>
    )
  },
)
