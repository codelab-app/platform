import { useStore } from '@codelab/frontend/presentation/container'
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

export const GetAppsList = observer(() => {
  const { appService } = useStore()
  const appList = appService.appsList

  return (
    <ErrorBoundary>
      <DisplayIf condition={!appList.length}>
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton>Create Now</CreateAppButton>
        </Empty>
      </DisplayIf>

      <Row gutter={[padding.sm, padding.sm]}>
        {appList.map((app) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem app={app} />
          </Col>
        ))}
      </Row>
    </ErrorBoundary>
  )
})
