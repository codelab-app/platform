'use client'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import { Button } from 'antd'
import React from 'react'
import { useImportAdminDataModal } from './import-admin-data-modal.state'

export const ImportAdminDataButton = () => {
  const importDataModal = useImportAdminDataModal()

  return (
    <Button icon={<ImportOutlined />} onClick={importDataModal.open}>
      Import Data
    </Button>
  )
}
