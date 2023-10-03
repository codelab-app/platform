import { Spinner } from '@codelab/frontend/presentation/view'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Builder } from './Builder'

interface BuilderTabsProps {
  error?: Parameters<typeof extractErrorMessage>[0]
  isLoading: boolean
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({ error, isLoading = true }) => {
    return (
      <Layout style={{ height: '100%' }}>
        {error && <Alert message={extractErrorMessage(error)} type="error" />}

        <Content>
          <Spinner center isLoading={isLoading}>
            <Builder />
          </Spinner>
        </Content>
      </Layout>
    )
  },
)
