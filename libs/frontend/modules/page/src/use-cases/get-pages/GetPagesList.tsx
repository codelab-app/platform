import { useCurrentAppId } from '@codelab/frontend/modules/app'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { List } from 'antd'
import React from 'react'
import { useGetPagesQuery } from '../../store'
import { GetPagesItem } from './GetPagesItem'

export const GetPagesList = () => {
  const currentAppId = useCurrentAppId()

  const { data, isLoading } = useGetPagesQuery({
    variables: { where: { app: { id: currentAppId } } },
  })

  const pages = data?.pages

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <List
        dataSource={pages}
        renderItem={(page) => (
          <GetPagesItem appId={currentAppId} key={page.id} page={page} />
        )}
        size="small"
      />
    </SpinnerWrapper>
  )
}
