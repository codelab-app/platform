import type { Metadata } from 'next'

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
import { UsersTable } from '@codelab/frontend-application-user/use-cases/user-list'
import { GetUsers } from '@codelab/frontend-domain-user/repositories'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { Dashboard } from '@codelab/frontend-presentation-view/templates'
import { Space } from 'antd'

export const metadata: Metadata = {
  title: 'Admin | Codelab',
}

const AdminView = async () => {
  const { users } = await GetUsers({})

  return (
    <Dashboard Header={<AdminViewHeader />}>
      <ContentSection>
        <Space className="w-full" direction="vertical" size="large">
          <Space>
            <ExportAdminDataButton />
            <ExportAdminDataModal />
            <ImportAdminDataButton />
            <ImportAdminDataModal />
            <ResetDataButtons />
          </Space>

          <UsersTable users={users} />
        </Space>
      </ContentSection>
    </Dashboard>
  )
}

export default AdminView
