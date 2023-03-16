import type {
  IDomainService,
  IPageService,
} from '@codelab/frontend/abstract/core'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { Spinner } from '@codelab/frontend/view/components'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = observer(() => {
  const { appService, pageService } = useStore()
  const appId = useCurrentAppId()

  const [{ result: app, status }, loadApp] = useAsync(() =>
    appService.loadAppWithNestedPreviews({ id: appId }),
  )

  useMountEffect(loadApp.execute)

  return (
    <Spinner isLoading={status === 'loading'}>
      <List
        dataSource={app?.pages.map((page) => page.current)}
        renderItem={(page) => (
          <GetPagesItem
            domains={app?.domains.map((domain) => domain.current)}
            key={page.id}
            page={page}
            pageService={pageService}
          />
        )}
        size="small"
      />
    </Spinner>
  )
})
