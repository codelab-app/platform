import { useGetAppsListQuery } from '@codelab/dgraph'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { padding, threeGridCol } from '@codelab/frontend/style'
import { User__AppFragment } from '@codelab/hasura'
import { Col, Empty, Row, Spin } from 'antd'
import React from 'react'
import { CreateAppButtonNow } from '../createApp'
import { GetAppsItem } from './GetAppsItem'

export const GetAppsList = () => {
  const { loading, data } = useGetAppsListQuery()
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.App)

  const appList = (data?.apps ?? []).filter(
    (app): app is User__AppFragment => !!app,
  )

  return (
    <>
      {loading && <Spin />}
      {!loading && (!appList || !appList.length) ? (
        <Empty
          imageStyle={{
            height: 60,
          }}
          description={<span>No apps found</span>}
        >
          <CreateAppButtonNow />
        </Empty>
      ) : null}
      <Row gutter={[padding.sm, padding.sm]}>
        {appList.map((app) => (
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem
              app={app}
              handleDeleteClick={(e) => openDeleteModal(e)}
              handleEditClick={(e) => openUpdateModal(e)}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
