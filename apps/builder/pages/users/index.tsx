import { IUser } from '@codelab/frontend/abstract/core'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  DashboardTemplate,
  DashboardTemplateProps,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

const UsersPage: CodelabPage<DashboardTemplateProps> = () => {
  // const { data } = useGetUsersQuery()
  const data = { users: [] }

  const dataSource = data?.users?.map((user: IUser) => ({
    id: user?.id,
    key: user?.id,
  }))

  const columns: ColumnsType<object> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Action',
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

export const getServerSideProps = auth0Instance.withPageAuthRequired()

UsersPage.Layout = DashboardTemplate
