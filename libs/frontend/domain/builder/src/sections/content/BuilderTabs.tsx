import type { IApp, IPage, IRenderer } from '@codelab/frontend/abstract/core'
import { RendererTab } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
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
  app: Maybe<IApp>
  page: Maybe<IPage>
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({ error, isLoading, app, page, renderer }) => {
    const { builderService } = useStore()
    const elementTree = page?.elementTree
    const appStore = app?.store.current

    return (
      <Layout style={{ height: '100%' }}>
        {error && <Alert message={extractErrorMessage(error)} type="error" />}
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
        {isLoading && <Spin />}
        <Content>
          {builderService.activeTree === RendererTab.Page ? (
            elementTree && renderer ? (
              <BaseBuilder elementTree={elementTree} renderer={renderer} />
            ) : null
          ) : builderService.activeComponent && appStore ? (
            <BuilderComponent
              BaseBuilder={BaseBuilder}
              appStore={appStore}
              componentId={builderService.activeComponent.id}
            />
          ) : null}
        </Content>
      </Layout>
    )
  },
)
