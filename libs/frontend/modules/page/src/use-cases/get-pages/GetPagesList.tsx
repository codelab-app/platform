import { useAppState } from '@codelab/frontend/modules/app'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { List } from 'antd'
import React from 'react'
import { useGetPagesQuery } from '../../store'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = () => {
  const { currentApp } = useAppState()
  const currentAppId = currentApp?.id as string

  const { data, isLoading } = useGetPagesQuery({
    variables: { input: { byApp: { appId: currentAppId } } },
  })

  const pages = data?.pages

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <List
        size="small"
        dataSource={pages}
        renderItem={(page) => (
          <GetPagesItem key={page.id} page={page} appId={currentAppId} />
        )}
      />
    </SpinnerWrapper>
  )
}
