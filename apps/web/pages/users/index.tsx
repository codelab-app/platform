import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  DeleteUserButton,
  DeleteUserModal,
  useGetUsersQuery,
} from '@codelab/frontend/modules/user'
import {
  DashboardTemplate,
  DashboardTemplateProps,
} from '@codelab/frontend/view/templates'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

const UsersPage: CodelabPage<DashboardTemplateProps> = () => {
  const { data } = useGetUsersQuery()

  const dataSource = data?.users?.map((user) => ({
    id: user?.id,
    key: user?.id,
  }))

  const columns: ColumnsType<any> = [
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
            <DeleteUserButton
              payload={{ deleteIds: [record.id], userNames: record.email }}
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

export const getServerSideProps = withPageAuthRequired()

UsersPage.Template = DashboardTemplate

export default UsersPage
