'use client'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export const ExportAdminDataButton = () => {
  const router = useRouter()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() => router.push(PageType.AdminExport())}
    >
      Export Data
    </Button>
  )
}
