import { Button, Col, Empty, Row, Spin } from 'antd'
import React from 'react'
import { useGetAppsListQuery } from '@codelab/hasura'
import { padding, threeGridCol } from '@codelab/frontend/style'
import { CreateAppModal } from '../createApp/CreateAppModal'
import { useCreateAppModal } from '../createApp/useCreateAppModal'
import { EditAppModal } from '../editApp/EditAppModal'
import { useEditAppModal } from '../editApp/useEditAppModal'
import { useDeleteAppConfirmation } from '../index'
import { GetAppsItem } from './GetAppsItem'

export const GetAppsList = () => {
  const { loading, data } = useGetAppsListQuery({})

  const { openDeleteConfirmation } = useDeleteAppConfirmation()
  const { openCreateAppModal } = useCreateAppModal()
  const { openEditAppModal } = useEditAppModal()

  const appList = data?.app

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
