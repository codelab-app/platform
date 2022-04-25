import { PROVIDER_TREE_PAGE_NAME } from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithPageService } from '../../store'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = observer<WithServices<PAGE_SERVICE>>(
  ({ pageService }) => {
    const appId = useCurrentAppId()

    const [getPages, { isLoading }] = useLoadingState(() =>
      pageService.getAll({ app: { id: appId } }),
    )

    const pagesList = pageService.pagesList
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
