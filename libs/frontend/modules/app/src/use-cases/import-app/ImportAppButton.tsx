import { ImportOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../hooks'

export const ImportAppButton = () => {
  const { openImportModal } = useAppDispatch()

  return (
    <Button icon={<ImportOutlined />} onClick={openImportModal} type="link">
      Import app
    </Button>
  )
}
