import type {
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  IRenderService,
  IStore,
} from '@codelab/frontend/abstract/core'
import { RendererTab } from '@codelab/frontend/abstract/core'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { Alert, Layout, Spin, Tabs } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BaseBuilder } from './BaseBuilder'
import { BuilderComponent } from './Builder-Component'

export interface BuilderTabsProps {
  error: Nullish<string>
  isLoading: boolean
  renderer: Maybe<IRenderer>
  builderService: IBuilderService
  elementService: IElementService
  elementTree: Maybe<IElementTree>
  componentService: IComponentService
  appStore: Maybe<IStore>
  builderRenderService: IRenderService
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({
    error,
    isLoading,
    builderService,
    elementTree,
    elementService,
    renderer,
    appStore,
    componentService,
    builderRenderService,
  }) => {
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
