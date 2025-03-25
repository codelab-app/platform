'use client'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export const ImportAdminDataButton = () => {
  const router = useRouter()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() => router.push(RoutePaths.AdminImport())}
    >
      Import Data
    </Button>
  )
}
