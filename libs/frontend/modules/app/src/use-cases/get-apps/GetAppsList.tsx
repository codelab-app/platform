import { API_ENV } from '@codelab/frontend/model/infra/redux'
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
  const { isLoading, data } = useGetAppsQuery({
    context: {
      env: API_ENV.v2,
    },
  })

  const appList = data?.apps

  console.log(appList)

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <ConditionalView condition={!appList || !appList.length}>
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton text="Create Now" />
        </Empty>
      </ConditionalView>
      <Row gutter={[padding.sm, padding.sm]}>
        {appList?.map((app) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem app={app} />
          </Col>
        ))}
      </Row>
    </SpinnerWrapper>
  )
}
