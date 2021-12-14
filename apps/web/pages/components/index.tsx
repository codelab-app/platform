import { PlusOutlined } from '@ant-design/icons'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
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
  DashboardTemplateProps,
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

export const getServerSideProps = withPageAuthRequired()

const Header = () => {
  const { openCreateModal } = useComponentDispatch()

  return (
    <PageHeader
      ghost={false}
      title="Components"
      extra={[
        <Button
          onClick={() => openCreateModal()}
          size={'small'}
          icon={<PlusOutlined />}
          key={0}
        />,
      ]}
    />
  )
}

Components.Template = DashboardTemplate
Components.templateProps = {
  SidebarNavigation,
  Header,
}

export default Components
