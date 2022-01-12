import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { padding, threeGridCol } from '@codelab/frontend/view/style'
import { Col, Empty, Row } from 'antd'
import React from 'react'
import { useGetAppsQuery } from '../../store'
import { CreateAppButton } from '../create-app'
import { GetAppsItem } from './GetAppsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const GetAppsList = () => {
  const { isLoading, data } = useGetAppsQuery()
  const appList = data?.apps

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <ConditionalView condition={!appList || !appList.length}>
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton createNow />
        </Empty>
      </ConditionalView>

      <Row gutter={[padding.sm, padding.sm]}>
        {appList?.map((app) => (
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem app={app} />
          </Col>
        ))}
      </Row>
    </SpinnerWrapper>
  )
}
