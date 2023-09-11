import { ImportOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ImportAdminDataButton = observer(() => {
  const { adminService } = useStore()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() => adminService.importDataModal.open()}
    >
      Import Data
    </Button>
  )
})
