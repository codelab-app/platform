import { IAppService } from '@codelab/frontend/abstract/core'
import { DisplayIf, ErrorBoundary } from '@codelab/frontend/view/components'
import { padding, threeGridCol } from '@codelab/frontend/view/style'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAppButton } from '../create-app'
import { GetAppsItem } from './GetAppsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const GetAppsList = observer<{ appService: IAppService }>(
  ({ appService }) => {
    const appList = appService.appsList

    return (
      <ErrorBoundary>
        <DisplayIf condition={!appList.length}>
          <Empty description="No apps found" imageStyle={emptyImageStyle}>
            <CreateAppButton appService={appService}>
              Create Now
            </CreateAppButton>
          </Empty>
        </DisplayIf>

        <Row gutter={[padding.sm, padding.sm]}>
          {appList.map((app) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Col key={app.id} {...threeGridCol}>
              <GetAppsItem app={app} appService={appService} />
            </Col>
          ))}
        </Row>
      </ErrorBoundary>
    )
  },
)
