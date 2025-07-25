import { Spinner } from '@codelab/frontend-presentation-view/components/loader'
import { extractErrorMessage } from '@codelab/frontend-shared-utils'
import { Alert, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'

interface BuilderTabsProps {
  error?: Parameters<typeof extractErrorMessage>[0]
  isLoading?: boolean
}

export const BuilderTabs = ({ error, isLoading = false }: BuilderTabsProps) => {
  // const { pageSlug } = useUrl()

  return (
    <Layout style={{ height: '100%' }}>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}

      <Content>
        <Spinner center isLoading={isLoading}>
          {/* <Builder > */}
        </Spinner>
      </Content>
    </Layout>
  )
}
