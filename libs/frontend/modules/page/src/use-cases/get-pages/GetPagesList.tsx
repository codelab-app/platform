import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithPageService } from '../../store'
import { providerTreePageName } from './consts'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = observer<WithPageService>(({ pageService }) => {
  const appId = useCurrentAppId()

  const [getPages, { isLoading }] = useLoadingState(() =>
    pageService.getAll({ app: { id: appId } }),
  )

  const pagesList = pageService.pagesList
  useEffect(() => {
    getPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const results = pagesList.concat([{ name: providerTreePageName }] as any)

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <List
        dataSource={results}
        renderItem={(page) => (
          <GetPagesItem key={page.id} page={page} pages={pageService} />
        )}
        size="small"
      />
    </SpinnerWrapper>
  )
})
