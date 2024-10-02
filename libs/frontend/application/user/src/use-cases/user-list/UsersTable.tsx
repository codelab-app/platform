'use client'

import type { IUserModel } from '@codelab/frontend/abstract/domain'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ColumnsType } from 'antd/lib/table'

import { Space, Table } from 'antd'

export const UsersTable = () => {
  // const { data } = useGetUsersQuery()
  const data = { users: [] }

  const dataSource = data.users.map((user: IUserModel) => ({
    id: user.id,
    key: user.id,
  }))

  const columns: ColumnsType<ObjectLike> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space>
            {/* <DeleteUserButton
              payload={{ deleteIds: [record.id], userNames: record.email }}
            /> */}
          </Space>
        )
      },
      title: 'Action',
    },
  ]

  return <Table columns={columns} dataSource={dataSource} />
}
