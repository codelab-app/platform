'use client'

import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAppButton } from '../create-app'
import { AppListItem } from './AppListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList = observer(() => {
  const { appDomainService } = useDomainStore()
  const apps = appDomainService.appsList

  if (!apps.length) {
    return (
      <Empty description="No apps found" imageStyle={emptyImageStyle}>
        <CreateAppButton>Create Now</CreateAppButton>
      </Empty>
    )
  }

  return (
    <Row gutter={[padding.sm, padding.sm]}>
      {apps.map((app) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Col key={app.id} {...threeGridCol}>
          <AppListItem app={app} />
        </Col>
      ))}
    </Row>
  )
})
