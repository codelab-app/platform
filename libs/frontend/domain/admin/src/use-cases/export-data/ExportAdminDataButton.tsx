import { ImportOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button, message } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ExportAdminDataButton = observer(() => {
  const { adminService } = useStore()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        adminService.exportData().then(async (res: any) => {
          const blob = await res.blob()

          // https://stackoverflow.com/questions/50570900/js-fetch-not-getting-headers-on-response
          const filename = res.headers
            .get('content-disposition')
            .split('filename=')[1]
            .split('.')[0]

          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = filename
          a.target = '_blank'
          a.click()

          URL.revokeObjectURL(url)

          return message.success('Export success!')
        })
      }
    >
      Export Data
    </Button>
  )
})
