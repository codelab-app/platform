import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import {
  padding,
  threeGridCol,
} from '@codelab/frontend-presentation-view/style'
import { Col, Empty, Row } from 'antd'
import React from 'react'
import { CreateAppButton } from '../create-app'
import { appListAction } from './app-list.action'
import { AppListItem } from './AppListItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const AppList = async () => {
  const owner = await getServerUser()
  const apps = await appListAction({ where: { owner } })

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
