import {
  ExportAdminDataButton,
  ExportAdminDataModal,
} from '@codelab/frontend-application-admin/use-cases/export-data'
import {
  ImportAdminDataButton,
  ImportAdminDataModal,
} from '@codelab/frontend-application-admin/use-cases/import-data'
import { ResetDataButtons } from '@codelab/frontend-application-admin/use-cases/reset-data'
import { AdminViewHeader } from '@codelab/frontend-application-admin/views'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { Space } from 'antd'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Admin | Codelab',
}

const AdminView = async () => {
  return (
    <DashboardTemplate Header={<AdminViewHeader />}>
      <ContentSection>
        <Space>
          <ExportAdminDataButton />
          <ExportAdminDataModal />

          <ImportAdminDataButton />
          <ImportAdminDataModal />

          <ResetDataButtons />
        </Space>
      </ContentSection>
    </DashboardTemplate>
  )
}

export default AdminView
