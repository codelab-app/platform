import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useAsyncState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { List } from 'antd'
import { cloneDeep } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo } from 'react'
import { PageStore } from '../../store'
import { GetPagesItem } from './GetPagesItem'

export interface GetPagesListProps {
  pages: PageStore
}

export const providerTreePageName = 'Provider Tree'

export const GetPagesList = observer<GetPagesListProps>(({ pages }) => {
  const appId = useCurrentAppId()

  const [getPages, { isLoading }] = useAsyncState(() =>
    pages.getAll({ app: { id: appId } }),
  )

  const pagesList = pages.pagesList
  useEffect(() => {
    getPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pageListWithProviderTree = useMemo(() => {
    const results = cloneDeep(toJS(pagesList)) || []

    results.push({
      name: providerTreePageName,
    } as any)

    return results
  }, [pagesList])

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <List
        dataSource={pageListWithProviderTree}
        renderItem={(page) => (
          <GetPagesItem key={page.id} page={page} pages={pages} />
        )}
        size="small"
      />
    </SpinnerWrapper>
  )
})
