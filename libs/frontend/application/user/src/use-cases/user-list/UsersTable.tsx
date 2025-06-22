'use client'

import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { UserFragment } from '@codelab/shared-infra-gqlgen'
import type { ColumnsType } from 'antd/lib/table'

import { userRepository } from '@codelab/frontend-domain-user/repositories'
import { Button, Table } from 'antd'

interface UserTableProps {
  users: Array<UserFragment>
}

export const UsersTable = ({ users }: UserTableProps) => {
  const onDeleteUser = (id: string) => userRepository.delete([{ id }])

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
    {
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <Button danger onClick={() => onDeleteUser(record.id)}>
            Delete
          </Button>
        )
      },
      title: 'Action',
    },
  ]

  return <Table columns={columns} dataSource={users} rowKey="id" />
}
