import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presentation/container'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetPagesItem } from './GetPagesItem'

export const PageList = observer(() => {
  const appId = useCurrentAppId()
  const { appService } = useStore()
  const app = appService.apps.get(appId)

  return (
    <List
      dataSource={app?.pages.map((page) => page.current)}
      loading={!app}
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
