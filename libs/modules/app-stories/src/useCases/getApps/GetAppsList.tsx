import { Button, Col, Empty, Row } from 'antd'
import React, { useEffect } from 'react'
import { useAppMachine } from '../../model'
import GetAppsItem from './GetAppsItem'

export const GetAppsList = () => {
  // Xstate init
  const app = useAppMachine()
  const appsList = app.state.context.apps
  const isLoading =
    app.state.value === 'gettingApps' || app.state.value.gettingApps
  const hasResults = appsList && appsList.length > 0

  // XState event senders
  const refresh = () => app.send('ON_GET_APPS')
  const create = () => app.send('ON_CREATE_APP')
  const deleteApp = (id: string) => app.send({ type: 'ON_DELETE_APP', id })

  useEffect(() => {
    refresh() // Initialize the apps on the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const appsGrid = (
    <>
      <Row gutter={[16, 16]}>
        {(appsList && appsList.length > 0 ? appsList : [0, 0, 0, 0, 0, 0]).map(
          (item: any) => (
            <Col className="gutter-row" span={6} xs={24} sm={12} md={8} lg={8}>
              <GetAppsItem
                app={item}
                loading={isLoading}
                onDeleteConfirmed={deleteApp}
              />
            </Col>
          ),
        )}
      </Row>
    </>
  )

  const empty = (
    <Empty
      imageStyle={{
        height: 60,
      }}
      description={<span>No apps found</span>}
    >
      <Button onClick={() => create()} type="primary">
        Create Now
      </Button>
    </Empty>
  )

  return <div>{isLoading || hasResults ? appsGrid : empty}</div>
}
