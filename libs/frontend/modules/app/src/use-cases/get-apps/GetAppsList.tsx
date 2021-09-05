import { padding, threeGridCol } from '@codelab/frontend/style'
import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { Col, Empty, Row, Spin } from 'antd'
import React from 'react'
import { CreateAppButtonNow } from '../create-app'
import { useGetAppsQuery } from './GetApps.api.graphql.gen'
import { GetAppsItem } from './GetAppsItem'

export const GetAppsList = () => {
  const { loading, data } = useGetAppsQuery()
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.App)
  const appList = data?.apps

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
        {appList?.map((app) => (
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem
              app={app}
              handleDeleteClick={(e, m) => openDeleteModal(e, m)}
              handleEditClick={(e, m) => openUpdateModal(e, m)}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
