import { Table, Typography } from 'antd'
import React from 'react'

const dataSource = [
  { value: 'ns1.digitalocean.com' },
  { value: 'ns2.digitalocean.com' },
  { value: 'ns3.digitalocean.com' },
]

const columns = [
  {
    dataIndex: 'value',
    render: (_: unknown, { value }: { value: string }) => {
      return <Typography.Text copyable>{value}</Typography.Text>
    },
    title: 'Name',
  },
]

export const ARecordTabContent = () => (
  <div>
    <p className="mb-2">
      Copy and paste our nameservers to your DNS provider's nameserver records:
    </p>
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
    />
  </div>
)
