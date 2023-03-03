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
    dataIndex: 'intendedNameservers',
    render: (
      _: unknown,
      { intendedNameservers }: { intendedNameservers: Array<string> },
    ) => {
      return <NS copyable nameServers={intendedNameservers} />
    },
    title: 'Intended Nameservers',
  },
  {
    dataIndex: 'nameservers',
    render: (_: unknown, { nameServers }: { nameServers: Array<string> }) => {
      return <NS copyable={false} nameServers={nameServers} />
    },
    title: 'Current Nameservers',
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
