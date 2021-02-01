import { Button, Col, Empty, Row } from 'antd'
import * as R from 'ramda'
import React from 'react'
import { useDeleteAppConfirmation } from '..'
import { CreateAppModal } from '../createApp/CreateAppModal'
import { useCreateAppModal } from '../createApp/useCreateAppModal'
import { EditAppModal } from '../editApp/EditAppModal'
import { useEditAppModal } from '../editApp/useEditAppModal'
import { AppType } from '../state'
import { GetAppsItem } from './GetAppsItem'
import { padding, threeGridCol } from '@codelab/frontend'
import { useGetAppsQuery } from '@codelab/generated'

type AppsFactoryProps = {
  apps?: Array<AppType>
  loading?: boolean
  handleDeleteClick: ReturnType<
    typeof useDeleteAppConfirmation
  >['openDeleteConfirmation']
  handleEditClick: ReturnType<typeof useEditAppModal>['openEditAppModal']
  openCreateAppModal: ReturnType<typeof useCreateAppModal>['openCreateAppModal']
}

const AppsGrid = ({
  apps,
  handleDeleteClick,
  handleEditClick,
}: AppsFactoryProps) => (
  <Row gutter={[padding.sm, padding.sm]}>
    {apps?.map((app) => (
      <Col key={app.id} {...threeGridCol}>
        <GetAppsItem
          app={app}
          loading={false}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />
      </Col>
    ))}
  </Row>
)

const LoadingAppsGrid = () => {
  return (
    <Row gutter={[padding.sm, padding.sm]}>
      {[0, 1, 2, 3, 4, 5].map((item: number) => (
        <Col key={item} {...threeGridCol}>
          <GetAppsItem loading />
        </Col>
      ))}
    </Row>
  )
}

const EmptyGrid = ({
  openCreateAppModal,
  apps,
  handleDeleteClick,
  loading,
  handleEditClick,
}: AppsFactoryProps) => {
  return (
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
  )
}

const AppsFactory = R.cond([
  [R.prop('loading'), LoadingAppsGrid],
  [R.propSatisfies((d: []) => Boolean(d && d.length), 'apps'), AppsGrid],
  [R.T, EmptyGrid],
])

export const GetAppsList = () => {
  const { loading, data } = useGetAppsQuery({
    notifyOnNetworkStatusChange: true,
  })

  // We can't use hooks inside rambdas, so just pile up all required hooks here
  const { openDeleteConfirmation } = useDeleteAppConfirmation()
  const { openCreateAppModal } = useCreateAppModal()
  const { openEditAppModal } = useEditAppModal()

  // No matter what (added notifyOnNetworkStatusChange, added awaitRefetchQueries to the mutations),
  // I couldn't manage to detect the loading state here here after using refetchQueries. Any ideas?
  // console.log(networkStatus, networkStatus === NetworkStatus.refetch)

  return (
    <>
      <AppsFactory
        apps={data?.getApps}
        loading={loading}
        handleDeleteClick={openDeleteConfirmation}
        handleEditClick={openEditAppModal}
        openCreateAppModal={openCreateAppModal}
      />
      <CreateAppModal />
      <EditAppModal />
    </>
  )
}
