import {
  IPageService,
  PROVIDER_TREE_PAGE_NAME,
} from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { Spinner } from '@codelab/frontend/view/components'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const appId = useCurrentAppId()

    const { loading } = useAsync(
      () => pageService.getAll({ app: { id: appId } }),
      [appId],
    )

    // pageService.pagesList doesn't filter by app
    const pagesList = pageService.pagesByApp(appId)
    const results = pagesList.concat([{ name: PROVIDER_TREE_PAGE_NAME }] as any)

    return (
      <Spinner isLoading={loading}>
        <List
          dataSource={results}
          renderItem={(page) => (
            <GetPagesItem key={page.id} page={page} pageService={pageService} />
          )}
          size="small"
        />
      </Spinner>
    )
  },
)
