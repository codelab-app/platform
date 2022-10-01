import { Table, Typography } from 'antd'
import React from 'react'
import tw from 'twin.macro'

interface NameServersProps {
  copyable?: boolean
  nameServers: Array<string>
}

export const NS = ({ copyable, nameServers = [] }: NameServersProps) => (
  <React.Fragment>
    {nameServers.map((ns) => (
      <Typography.Paragraph copyable={copyable}>{ns}</Typography.Paragraph>
    ))}
  </React.Fragment>
)

const columns = [
  {
    title: 'Intended Nameservers',
    dataIndex: 'intendedNameservers',
    render: (
      _: any,
      { intendedNameservers }: { intendedNameservers: Array<string> },
    ) => {
      return <NS copyable nameServers={intendedNameservers} />
    },
  },
  {
    title: 'Current Nameservers',
    dataIndex: 'nameservers',
    render: (_: any, { nameServers }: { nameServers: Array<string> }) => {
      return <NS copyable={false} nameServers={nameServers} />
    },
  },
]

interface NameServerTabContentProps {
  intendedNameservers: Array<string>
  nameServers: Array<string>
}

export const NameServerTabContent = ({
  intendedNameservers,
  nameServers,
}: NameServerTabContentProps) => {
  const dataSource = [
    {
      intendedNameservers,
      nameServers,
    },
  ]

  return (
    <div>
      <p css={tw`mb-2`}>
        To continue, please set the nameservers of nghia.dev (apex domain) to
        the intended nameservers listed below:
      </p>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
      />
    </div>
  )
}
