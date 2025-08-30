'use client'

import { Space } from '@codelab/frontend-presentation-components-space'
import { Empty, Typography } from 'antd'

import { AppCard, AppsSummary } from '.'

const { Title } = Typography

interface App {
  id: string
  name: string
  pages: Array<{
    id: string
    name: string
    urlPattern: string
  }>
}

interface PageLayoutProps {
  apps: Array<App>
  totalPages: number
}

export const PageLayout = ({ apps, totalPages }: PageLayoutProps) => {
  return (
    <div className="p-8">
      <Title className="mb-8" level={1}>
        App Preview Links
      </Title>

      {apps.length === 0 ? (
        <Empty description="No apps found." />
      ) : (
        <>
          <AppsSummary appsCount={apps.length} totalPages={totalPages} />
          <Space className="w-full" direction="vertical" size="large">
            {apps.map((app) => (
              <AppCard app={app} key={app.id} />
            ))}
          </Space>
        </>
      )}
    </div>
  )
}
