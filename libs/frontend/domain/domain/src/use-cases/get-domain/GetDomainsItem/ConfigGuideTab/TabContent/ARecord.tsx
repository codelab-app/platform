import { Table, Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'

const dataSource = [
  {
    name: '@',
    type: 'A',
    value: '76.76.21.21',
  },
]

const columns = [
  {
    dataIndex: 'name',
    title: 'Name',
  },
  {
    dataIndex: 'type',
    title: 'Type',
  },
  {
    dataIndex: 'value',
    render: (_: unknown, { value }: { value: string }) => {
      return <Typography.Text copyable>{value}</Typography.Text>
    },
    title: 'Value',
  },
]

export const ARecordTabContent = () => (
  <div>
    <p css={tw`mb-2`}>
      Set the following record on your DNS provider to continue:
    </p>
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
    />
  </div>
)
