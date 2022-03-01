import { ImportOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export const ImportAppButton = () => {
  // const { openImportModal } = useAppActions()

  return (
    <Button icon={<ImportOutlined />} type="link">
      Import app
    </Button>
  )
}
