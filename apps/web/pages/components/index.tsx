import { PlusOutlined } from '@ant-design/icons'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import {
  CreateComponentModal,
  DeleteElementModal,
  GetComponentsTable,
  useComponentDispatch,
} from '@codelab/frontend/modules/element'
import { UpdateTagModal } from '@codelab/frontend/modules/tag'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const Components: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Components | Codelab</title>
      </Head>

      <CreateComponentModal />
      <UpdateTagModal />
      <DeleteElementModal />
      <ContentSection>
        <GetComponentsTable />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const { openCreateModal } = useComponentDispatch()

  return (
    <PageHeader
      extra={[
        <Button
          icon={<PlusOutlined />}
          key={0}
          onClick={() => openCreateModal()}
          size="small"
        />,
      ]}
      ghost={false}
      title="Components"
    />
  )
}

export default Components

export const getServerSideProps = withPageAuthRequired()

Components.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
