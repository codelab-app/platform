import type { IUser } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import React from 'react'

const UsersPage: CodelabPage<DashboardTemplateProps> = () => {
  // const { data } = useGetUsersQuery()
  const data = { users: [] }

  const dataSource = data.users.map((user: IUser) => ({
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

export default UsersPage

export const getServerSideProps = withPageAuthRedirect()

UsersPage.Layout = ({ children }) => {
  return <DashboardTemplate>{children()}</DashboardTemplate>
}
