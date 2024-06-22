'use client'

import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import type { AppPreviewFragment } from '@codelab/shared/abstract/codegen'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { CreateAppButton } from '../create-app'
import { AppListItem } from './AppListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList = observer<{ apps: Array<AppPreviewFragment> }>(
  ({ apps }) => {
    const { appDomainService } = useStore()

    useEffect(() => {
      for (const app of apps) {
        appDomainService.hydrate(app)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apps])

    if (!appDomainService.appsList.length) {
      return (
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton>Create Now</CreateAppButton>
        </Empty>
      )
    }

    return (
      <Row gutter={[padding.sm, padding.sm]}>
        {appDomainService.appsList.map((app) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={app.id} {...threeGridCol}>
            <AppListItem app={app} />
          </Col>
        ))}
      </Row>
    )
  },
)
