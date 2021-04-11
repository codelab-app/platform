import { Button, Col, Empty, Row, Spin } from 'antd'
import React from 'react'
import { useGetAppsListForUserQuery } from '@codelab/hasura'
import { padding, threeGridCol } from '@codelab/frontend/style'
import { CreateAppModal } from '../createApp/CreateAppModal'
import { useCreateAppModal } from '../createApp/useCreateAppModal'
import { EditAppModal } from '../editApp/EditAppModal'
import { useEditAppModal } from '../editApp/useEditAppModal'
import { useDeleteAppConfirmation } from '../index'
import { GetAppsItem } from './GetAppsItem'
import { useUser } from '@auth0/nextjs-auth0'

export const GetAppsList = () => {
  const { user: currentUser } = useUser()
  const { loading, data } = useGetAppsListForUserQuery({
    variables: {
      userId: currentUser?.sub as string,
    },
  })

  const { openDeleteConfirmation } = useDeleteAppConfirmation()
  const { openCreateAppModal } = useCreateAppModal()
  const { openEditAppModal } = useEditAppModal()

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
          <Button onClick={openCreateAppModal} type="primary">
            Create Now
          </Button>
        </Empty>
      ) : null}
      <Row gutter={[padding.sm, padding.sm]}>
        {appList?.map((app) => (
          <Col key={app.id} {...threeGridCol}>
            <GetAppsItem
              app={app}
              handleDeleteClick={openDeleteConfirmation}
              handleEditClick={openEditAppModal}
            />
          </Col>
        ))}
      </Row>
      <CreateAppModal />
      <EditAppModal />
    </>
  )
}
