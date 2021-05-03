import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { padding, threeGridCol } from '@codelab/frontend/style'
import { useGetAppsListQuery } from '@codelab/hasura'
import { Button, Col, Empty, Row, Spin } from 'antd'
import React from 'react'
import { GetAppsItem } from './GetAppsItem'

export const GetAppsList = () => {
  const { loading, data } = useGetAppsListQuery()

  const {
    openDeleteModal,
    openUpdateModal,
    openCreateModal,
  } = useCRUDModalForm(EntityType.App)

  const appList = data?.app ?? []

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
          <Button onClick={() => openCreateModal()} type="primary">
            Create Now
          </Button>
        </Empty>
      ) : null}
      <Row gutter={[padding.sm, padding.sm]}>
        {appList?.map((app) => (
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
