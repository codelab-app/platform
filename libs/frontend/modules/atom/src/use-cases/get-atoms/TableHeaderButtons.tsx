import { Button, Space } from 'antd'
import React from 'react'

type TableHeaderButtonProps = {
  exportData: () => void
}

export const TableHeaderButtons = ({ exportData }: TableHeaderButtonProps) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <Button onClick={exportData}>Export</Button>
    </Space>
  )
}
