import { useGetUsersQuery } from '@codelab/graphql'
import { DeleteUserButton, DeleteUserModal } from '@codelab/modules/user'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

const Users = () => {
  const { data } = useGetUsersQuery()
  console.log('Data', data)

  const dataSource = data?.users?.map((user) => ({
    id: user?.id,
    key: user?.id,
    email: user?.email,
  }))

  const columns: ColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space>
            <DeleteUserButton
              ids={[record.id]}
              metadata={{ userNames: record.email }}
            />
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <DeleteUserModal />
      <Table dataSource={dataSource} columns={columns} />;
    </>
  )
}

export default Users
