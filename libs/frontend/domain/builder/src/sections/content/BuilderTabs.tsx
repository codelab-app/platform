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
  app: Maybe<IApp>
  error: Nullish<string>
  isLoading: boolean
  page: Maybe<IPage>
  renderer: Maybe<IRenderer>
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({ app, error, isLoading, page, renderer }) => {
    const { builderService } = useStore()
    const store = page?.store.current

    const tabItems = [
      {
        key: RendererTab.Page,
        label: 'Page',
      },
      {
        key: RendererTab.Component,
        label: 'Component',
      },
    ]

    return (
      <Layout style={{ height: '100%' }}>
        {error && <Alert message={extractErrorMessage(error)} type="error" />}
        <Header style={{ background: 'rgba(0,0,0,0)', marginBottom: '5px' }}>
          <Tabs
            activeKey={builderService.activeTab}
            defaultActiveKey={RendererTab.Page}
            items={tabItems}
            onChange={(key) => console.log(key)}
            type="card"
          />
        </Header>
        {isLoading && <Spin />}
        <Content>
          {builderService.activeTab === RendererTab.Page ? (
            page && renderer ? (
              <BaseBuilder elementTree={page} renderer={renderer} />
            ) : null
          ) : builderService.activeComponent && store ? (
            <BuilderComponent
              BaseBuilder={BaseBuilder}
              appStore={store}
              componentId={builderService.activeComponent.id}
            />
          ) : null}
        </Content>
      </Layout>
    )
  },
)
