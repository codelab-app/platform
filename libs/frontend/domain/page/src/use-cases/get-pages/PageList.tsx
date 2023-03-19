import type { IApp } from '@codelab/frontend/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetPagesItem } from './GetPagesItem'

interface PageListProps {
  app?: IApp
  loading: boolean
}

export const PageList = observer<PageListProps>(({ app, loading }) => {
  return (
    <List
      dataSource={app?.pages.map((page) => page.current)}
      loading={loading}
      renderItem={(page) => (
        <GetPagesItem
          domains={app?.domains.map((domain) => domain.current)}
          key={page.id}
          page={page}
        />
      )}
      size="small"
    />
  )
})
