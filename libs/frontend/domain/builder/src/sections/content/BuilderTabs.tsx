import { RendererTab } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { Alert, Layout, Tabs } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Builder } from './Builder'

interface BuilderTabsProps {
  error?: Parameters<typeof extractErrorMessage>[0]
  isLoading: boolean
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({ error, isLoading = true }) => {
    const { builderService } = useStore()

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
        <Content>
          <Spinner center isLoading={isLoading}>
            <Builder />
          </Spinner>
        </Content>
      </Layout>
    )
  },
)
