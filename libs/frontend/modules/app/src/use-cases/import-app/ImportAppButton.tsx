import { ImportOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../hooks'

export const ImportAppButton = (props: ButtonProps) => {
  const { openImportModal } = useAppDispatch()

  return (
    <Button
      type="primary"
      icon={<ImportOutlined />}
      onClick={openImportModal}
      {...props}
    >
      Import app
    </Button>
  )
}
