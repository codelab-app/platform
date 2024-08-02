import type { IUserModel } from '@codelab/frontend/abstract/domain'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Users | Codelab',
}

const UsersRoute = () => {
  // const { data } = useGetUsersQuery()
  const data = { users: [] }

  const dataSource = data.users.map((user: IUserModel) => ({
    id: user.id,
    key: user.id,
  }))

  const columns: ColumnsType<object> = [
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

  return (
    <>
      {/* <DeleteUserModal /> */}
      <Table columns={columns} dataSource={dataSource} />;
    </>
  )
}

export default UsersRoute
