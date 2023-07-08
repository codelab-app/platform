import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  ExportAdminDataButton,
  ImportDataButton,
} from '@codelab/frontend/domain/admin'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation//codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { withPageAuthRedirect } from '@codelab/frontend/shared/utils'
import { Image, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AdminPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>
      <ContentSection className="bg-white p-4">
        <Space>
          <ExportAdminDataButton />
          <ImportDataButton />
        </Space>
      </ContentSection>
    </>
  )
})

export default AdminPage

export const getServerSideProps = withPageAuthRedirect()

AdminPage.Layout = ({ children }) => {
  const AdminHeader = () => (
    <CuiHeader
      direction={<CuiHeaderBreadcrumb items={[{ title: 'Admin' }]} />}
      logo={
        <Image
          alt="codelab logo"
          className="h-full w-full"
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
