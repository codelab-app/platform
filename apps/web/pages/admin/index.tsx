import {
  AdminView,
  AdminViewLayout,
  ExportAdminDataButton,
  ExportAdminDataModal,
  ImportAdminDataButton,
  ImportAdminDataModal,
  ResetDataButtons,
} from '@codelab/frontend/application/admin'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { ContentSection } from '@codelab/frontend/presentation/view'
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
