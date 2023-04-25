import { ImportOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button, message } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ImportDataButton = observer(() => {
  const { adminService } = useStore()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() =>
        adminService.import().then(() => message.success('Import success!'))
      }
    >
      Import Data
    </Button>
  )
})
