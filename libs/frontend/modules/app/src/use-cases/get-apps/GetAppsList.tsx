import { ConditionalView } from '@codelab/frontend/view/components'
import { padding, threeGridCol } from '@codelab/frontend/view/style'
import { Col, Empty, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithAppService } from '../../store'
import { CreateAppButton } from '../create-app'
import { GetAppsItem } from './GetAppsItem'

const emptyImageStyle: React.CSSProperties = {
  height: 60,
}

export const GetAppsList = observer<WithAppService>(({ appService }) => {
  // const [load, { isLoading, error }] = useLoadingState(() =>
  //   appService.getAll(),
  // )

  // useEffect(() => {
  //   load()
  // }, [load])

  // appService.getAll()

  const appList = appService.appsList

  return (
    // <SpinnerWrapper isLoading={isLoading}>
    // <ConditionalView condition={!!error}>
    //   <Alert type="error">{error}</Alert>
    // </ConditionalView>

    <>
      <ConditionalView condition={!appList || !appList.length}>
        <Empty description="No apps found" imageStyle={emptyImageStyle}>
          <CreateAppButton appService={appService} text="Create Now" />
        </Empty>
      </ConditionalView>

      <Row gutter={[padding.sm, padding.sm]}>
        {appList?.map((app) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem app={app} appService={appService} />
          </Col>
        ))}
      </Row>
    </>
    // </SpinnerWrapper>
  )
})
