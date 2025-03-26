'use client'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export const ImportAdminDataButton = () => {
  const router = useRouter()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() => router.push(NewRoutePaths.Admin.import())}
    >
      Import Data
    </Button>
  )
}
