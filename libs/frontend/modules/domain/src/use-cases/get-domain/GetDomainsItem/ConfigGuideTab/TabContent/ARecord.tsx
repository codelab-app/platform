import { Table, Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'

const dataSource = [
  {
    type: 'A',
    name: '@',
    value: '76.76.21.21',
  },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    render: (_: any, { value }: { value: string }) => {
      return <Typography.Text copyable>{value}</Typography.Text>
    },
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
