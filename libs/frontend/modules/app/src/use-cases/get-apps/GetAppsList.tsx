import { useAsyncState } from '@codelab/frontend/shared/utils'
import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { padding, threeGridCol } from '@codelab/frontend/view/style'
import { Alert, Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { AppStore } from '../../store'
import { CreateAppButton } from '../create-app'
import { GetAppsItem } from './GetAppsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export interface GetAppsListProps {
  apps: AppStore
}

export const GetAppsList = observer<GetAppsListProps>(({ apps }) => {
  const [load, { isLoading, error }] = useAsyncState(() => apps.getAll())
  useEffect(() => {
    load()
  }, [load])

  const appList = apps.appsList

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <ConditionalView condition={!!error}>
        <Alert type="error">{error}</Alert>
      </ConditionalView>

      <ConditionalView condition={!appList || !appList.length}>
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton apps={apps} text="Create Now" />
        </Empty>
      </ConditionalView>

      <Row gutter={[padding.sm, padding.sm]}>
        {appList?.map((app) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem app={app} apps={apps} />
          </Col>
        ))}
      </Row>
    </SpinnerWrapper>
  )
})
