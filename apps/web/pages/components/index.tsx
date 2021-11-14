import { PlusOutlined } from '@ant-design/icons'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  componentActions,
  CreateComponentModal,
  DeleteElementModal,
  GetComponentsTable,
} from '@codelab/frontend/modules/element'
import { UpdateTagModal } from '@codelab/frontend/modules/tag'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button } from 'antd'
import PageHeader from 'antd/lib/page-header'
import Head from 'next/head'
import React from 'react'
import { useDispatch } from 'react-redux'

const Components: CodelabPage = () => {
  const dispatch = useDispatch()
  const openCreateModal = () => dispatch(componentActions.openCreateModal())

  const pageHeaderButtons = [
    <Button
      onClick={() => openCreateModal()}
      size={'small'}
      icon={<PlusOutlined />}
      key={0}
    />,
  ]

  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Components"
        extra={pageHeaderButtons}
      />
      <CreateComponentModal />
      <UpdateTagModal />
      <DeleteElementModal />
      <ContentSection>
        <GetComponentsTable />
      </ContentSection>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

Components.Template = DashboardTemplate
Components.Header = null
Components.MetaPane = null
Components.MainPane = null
Components.SidebarNavigation = SidebarNavigation

export default Components
