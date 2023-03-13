import { ImportOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presenter/container'
import { Button, message } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ExportAdminDataButton = observer(() => {
  const { adminService } = useStore()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() =>
        adminService.export().then(() => message.success('Export success!'))
      }
    >
      Export Data
    </Button>
  )
})
