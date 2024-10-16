'use client'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import { Button } from 'antd'

import { useExportAdminDataModal } from './export-admin-data.state'

export const ExportAdminDataButton = () => {
  const exportDataModal = useExportAdminDataModal()

  return (
    <Button icon={<ImportOutlined />} onClick={() => exportDataModal.open()}>
      Export Data
    </Button>
  )
}
