import {
  ExportAdminDataButton,
  ExportAdminDataModal,
} from '@codelab/frontend-application-admin/use-cases/export-data'
import {
  ImportAdminDataButton,
  ImportAdminDataModal,
} from '@codelab/frontend-application-admin/use-cases/import-data'
import { ResetDataButtons } from '@codelab/frontend-application-admin/use-cases/reset-data'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { Space } from 'antd'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Admin | Codelab',
}

const AdminView = async () => {
  return (
    <ContentSection>
      <Space>
        <ExportAdminDataButton />
        <ExportAdminDataModal />

        <ImportAdminDataButton />
        <ImportAdminDataModal />

        <ResetDataButtons />
      </Space>
    </ContentSection>
  )
}

export default AdminView
