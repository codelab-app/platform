import { Button, Col, Empty, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useAppMachine } from '../../model'
import GetAppsItem from './GetAppsItem'

export const GetAppsList = () => {
  const app = useAppMachine()
  const appsList = app.state.context.apps
  const isLoading =
    app.state.value === 'gettingApps' || app.state.value.gettingApps

  // TODO: refresh after creating app
  const refresh = () => app.send('ON_GET_APPS')
  const create = () => app.send('ON_CREATE_APP')

  useEffect(() => {
    // Initialize the apps on the first render
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const style = { background: '#0092ff', padding: '8px 0' }

  const responsiveSpan = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 8,
  }

  return (
    <div>
      <style jsx>
        {`
          .spinner-container {
            text-align: center;
            border-radius: 4px;
            padding: 30px 50px;
            margin: 20px 0;
          }
        `}
      </style>
      <Button onClick={refresh}>Refresh</Button>
      {/* Loading */}
      {isLoading && (
        <div className="spinner-container">
          <Spin />
        </div>
      )}

      {/* Not loading and no results */}
      {!isLoading && (!appsList || appsList.length === 0) && (
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
      )}

      {/*  Not loading and has results */}
      {!isLoading && appsList && appsList.length > 0 && (
        <Row gutter={[8, 8]}>
          {appsList.map((item: any) => (
            <Col className="gutter-row" span={6} {...responsiveSpan}>
              <div style={style}>
                <GetAppsItem app={item} />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
