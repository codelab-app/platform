'use client'

import { Card, Skeleton } from 'antd'

import { AppListGrid } from './AppList'

export const AppListPreview = () => {
  return (
    <AppListGrid apps={Array(3).fill({})}>
      {(app) => (
        <Card>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
      )}
    </AppListGrid>
  )
}
