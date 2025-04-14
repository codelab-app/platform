import type { Metadata } from 'next'

import { ExportAdminDataButton } from '@codelab/frontend-application-admin/use-cases/export-data'
import { ImportAdminDataButton } from '@codelab/frontend-application-admin/use-cases/import-data'
import { ResetDataButtons } from '@codelab/frontend-application-admin/use-cases/reset-data'
import { UsersTable } from '@codelab/frontend-application-user/use-cases/user-list'
import { userRepository } from '@codelab/frontend-domain-user/repositories'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import { Space } from 'antd'

export const metadata: Metadata = {
  title: 'Admin | Codelab',
}

const AdminView = async () => {
  const { items: users } = await userRepository.find()

  return (
    <ContentSection>
      <Space className="w-full" direction="vertical" size="large">
        <Space>
          <ExportAdminDataButton />
          <ImportAdminDataButton />
          <ResetDataButtons />
        </Space>
        <UsersTable users={users} />
      </Space>
    </ContentSection>
  )
}

export default AdminView
