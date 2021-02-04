import { Button, Col, Empty, Row } from 'antd'
import React from 'react'
import { CreateAppModal } from '../createApp/CreateAppModal'
import { useCreateAppModal } from '../createApp/useCreateAppModal'
import { EditAppModal } from '../editApp/EditAppModal'
import { useEditAppModal } from '../editApp/useEditAppModal'
import { useDeleteAppConfirmation } from '../index'
import { GetAppsItem } from './GetAppsItem'
import { padding, threeGridCol } from '@codelab/frontend'
import { useGetAppsQuery } from '@codelab/generated'

export const GetAppsList = () => {
  const { loading, data } = useGetAppsQuery({
    notifyOnNetworkStatusChange: true,
  })

  const { openDeleteConfirmation } = useDeleteAppConfirmation()
  const { openCreateAppModal } = useCreateAppModal()
  const { openEditAppModal } = useEditAppModal()

  return (
    <>
      {!data?.getApps ? (
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
        {data?.getApps?.map((app) => (
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
