import {
  ExportAdminDataButton,
  ExportAdminDataModal,
} from '@codelab/frontend-application-admin/use-cases/export-data'
import {
  ImportAdminDataButton,
  ImportAdminDataModal,
} from '@codelab/frontend-application-admin/use-cases/import-data'
import { ResetDataButtons } from '@codelab/frontend-application-admin/use-cases/reset-data'
import {
  type AdminView,
  AdminViewLayout,
} from '@codelab/frontend-application-admin/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth/guards'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AdminView: AdminView = observer(() => {
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

export default AdminView

export const getServerSideProps = withPageAuthRedirect()

AdminView.Layout = AdminViewLayout
