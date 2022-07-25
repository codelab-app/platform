import { PROVIDER_TREE_PAGE_NAME } from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { IPageService } from '@codelab/shared/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const appId = useCurrentAppId()

    const [getPages, { isLoading }] = useStatefulExecutor(() =>
      pageService.getAll({ app: { id: appId } }),
    )

    // pageService.pagesList doesn't filter by app
    const pagesList = pageService.pagesByApp(appId)
    useEffect(() => {
      getPages()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const results = pagesList.concat([{ name: PROVIDER_TREE_PAGE_NAME }] as any)

    return (
      <Spinner isLoading={isLoading}>
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
