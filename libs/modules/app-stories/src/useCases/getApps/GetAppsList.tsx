import { Button, Col, Empty, Row } from 'antd'
import React, { useEffect } from 'react'
import { useAppMachine } from '../../model'
import { useDeleteApp } from '../deleteApp'
import { GetAppsItem } from './GetAppsItem'
import { padding, threeGridCol } from '@codelab/frontend'

export const GetAppsList = () => {
  const app = useAppMachine()
  const appsList = app.state.context.apps
  const isLoading =
    app.state.value === 'gettingApps' || app.state.value.gettingApps
  const hasResults = appsList && appsList.length > 0

  const refresh = () => app.send('ON_GET_APPS')
  const create = () => app.send('ON_CREATE_APP')

  const { handleDeleteClick } = useDeleteApp()

  useEffect(() => {
    refresh() // Initialize the apps on the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const appsGrid = (
    <Row gutter={[padding.sm, padding.sm]}>
      {(appsList && appsList.length > 0 ? appsList : [0, 1, 2, 3, 4, 5]).map(
        (item: any) => (
          <Col
            key={typeof item === 'number' ? item : item.id}
            {...threeGridCol}
          >
            <GetAppsItem
              app={item}
              loading={isLoading}
              handleDeleteClick={handleDeleteClick}
            />
          </Col>
        ),
      )}
    </Row>
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

  return <>{isLoading || hasResults ? appsGrid : empty}</>
}
