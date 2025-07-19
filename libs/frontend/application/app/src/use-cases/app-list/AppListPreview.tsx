'use client'

import type { IAppModel } from '@codelab/frontend-abstract-domain'

import { Card, Skeleton } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import { AppListGrid } from './AppList'

export const AppListPreview = () => {
  return (
    // id used as a key
    <AppListGrid
      apps={[...Array(3)].map(() => ({ id: uuidv4() } as IAppModel))}
    >
      {(app) => (
        <Card>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
      )}
    </AppListGrid>
  )
}
