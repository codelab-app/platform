import { useGetAllUsersQuery } from '@codelab/dgraph'
import { DeleteUserButton, DeleteUserModal } from '@codelab/modules/user'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

const Users = () => {
  const { data } = useGetAllUsersQuery()

  console.log(data)

  const dataSource = data?.GetAllUsers?.map((user) => ({
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
      render: (text, record, index) => {
        return (
          <Space>
            <DeleteUserButton ids={[record.id]} />
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
