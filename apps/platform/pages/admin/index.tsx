import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  ExportAdminDataButton,
  ExportAdminDataModal,
  ImportAdminDataButton,
  ImportAdminDataModal,
  ResetDataButtons,
} from '@codelab/frontend/application/admin'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { Image, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

type AdminPage = CodelabPage<DashboardTemplateProps>

const AdminPage: AdminPage = observer(() => {
  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>
      <ContentSection className="bg-white p-4">
        <Space>
          <ExportAdminDataButton />
          <ExportAdminDataModal />
          <ImportAdminDataButton />
          <ImportAdminDataModal />
          <ResetDataButtons />
        </Space>
      </ContentSection>
    </>
  )
})

export default AdminPage

export const getServerSideProps = withPageAuthRedirect()

const AdminPageLayout: AdminPage['Layout'] = ({ children }) => {
  const AdminHeader = () => (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Admin' }]} />}
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )

  return (
    <DashboardTemplate Header={AdminHeader}>{children()}</DashboardTemplate>
  )
}

AdminPage.Layout = AdminPageLayout
