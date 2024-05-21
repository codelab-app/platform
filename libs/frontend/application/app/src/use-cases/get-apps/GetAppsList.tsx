'use client'

import { useStore } from '@codelab/frontend/application/shared/store'
import {
  DisplayIf,
  ErrorBoundary,
  padding,
  threeGridCol,
} from '@codelab/frontend/presentation/view'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAppButton } from '../create-app'
import { GetAppsItem } from './GetAppsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const GetAppsList = observer(async () => {
  const { appService, userService } = useStore()
  const user = userService.user
  const apps = await appService.loadAppsPreview({ owner: { id: user.id } })

  // const appList = appService.appDomainService.appsList

  return (
    <ErrorBoundary>
      <DisplayIf condition={!apps.length}>
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton>Create Now</CreateAppButton>
        </Empty>
      </DisplayIf>

      <Row gutter={[padding.sm, padding.sm]}>
        {apps.map((app) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem app={app} />
          </Col>
        ))}
      </Row>
    </ErrorBoundary>
  )
})
