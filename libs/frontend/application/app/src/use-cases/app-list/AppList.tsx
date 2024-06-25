import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { Col, Empty, Row } from 'antd'
import React from 'react'
import { CreateAppButton } from '../create-app'
import { AppListItem } from './AppListItem'

export interface AppListProps {
  apps: Array<IAppDto>
}

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList = ({ apps }: AppListProps) => {
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
}
