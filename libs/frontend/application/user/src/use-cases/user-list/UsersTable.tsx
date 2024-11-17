'use client'

import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { UserFragment } from '@codelab/shared/infra/gql'
import type { ColumnsType } from 'antd/lib/table'

import { Table } from 'antd'

export const UsersTable = ({ users }: { users: Array<UserFragment> }) => {
  const columns: ColumnsType<ObjectLike> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'auth0Id',
      key: 'auth0Id',
      title: 'Auth0Id',
    },
    {
      dataIndex: 'username',
      key: 'username',
      title: 'User Name',
    },
    {
      dataIndex: 'email',
      key: 'email',
      title: 'Email',
    },
    {
      dataIndex: 'roles',
      key: 'roles',
      render: (value) => value.join(', '),
      title: 'Roles',
    },
    // {
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (text, record) => {
    //     return (
    //       <Space>
    //         <DeleteUserButton
    //           payload={{ deleteIds: [record.id], userNames: record.email }}
    //         />
    //       </Space>
    //     )
    //   },
    //   title: 'Action',
    // },
  ]

  return <Table columns={columns} dataSource={users} />
}
