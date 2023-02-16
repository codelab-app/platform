import type {
  IDomainService,
  IPageService,
} from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { Spinner } from '@codelab/frontend/view/components'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = observer<{
  pageService: IPageService
  domainService: IDomainService
}>(({ pageService, domainService }) => {
  const appId = useCurrentAppId()

  const { loading } = useAsync(
    () => pageService.getAll({ appConnection: { node: { id: appId } } }),
    [appId],
  )

  const { value: domains } = useAsync(
    () => domainService.getAll({ appConnection: { node: { id: appId } } }),
    [appId],
  )

  // pageService.pagesList doesn't filter by app
  const pagesList = pageService.pagesByApp(appId)

  return (
    <Spinner isLoading={loading}>
      <List
        dataSource={pagesList}
        renderItem={(page) => (
          <GetPagesItem
            domains={domains}
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
