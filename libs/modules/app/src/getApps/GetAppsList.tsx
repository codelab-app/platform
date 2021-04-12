import { Button, Col, Empty, Row, Spin } from 'antd'
import React from 'react'
import { useGetAppsListForUserQuery } from '@codelab/hasura'
import { padding, threeGridCol } from '@codelab/frontend/style'
import { GetAppsItem } from './GetAppsItem'
import { useUser } from '@auth0/nextjs-auth0'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'

export const GetAppsList = () => {
  const { user: currentUser } = useUser()
  const { loading, data } = useGetAppsListForUserQuery({
    variables: {
      userId: currentUser?.sub as string,
    },
  })
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
