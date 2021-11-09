import { Space, Table } from 'antd'
import React from 'react'
import { DeleteLambdaButton } from '../delete-lambda'
import { ExecuteLambdaButton } from '../execute-lambda'
import { useGetLambdasQuery } from '../lambda.endpoints'
import { UpdateLambdaButton } from '../update-lambda'
import { LambdaRecord } from './LambdaRecord'

const mapDataSource = (lambdas: Array<LambdaRecord>) =>
  lambdas?.map((lambda: LambdaRecord) => ({
    id: lambda.id,
    key: lambda.id,
    name: lambda.name,
    body: lambda.body,
  }))

export const GetLambdasTable = () => {
  // const { app, appId } = useContext(AppPageContext)

  // const { loading, data } = useGetLambdasByLibraryIdQuery({
  //   variables: {
  //     libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
  //   },
  // })
  const { isLoading, data } = useGetLambdasQuery()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: LambdaRecord) => (
        <Space size="middle">
          <ExecuteLambdaButton {...record} />
          <UpdateLambdaButton {...record} />
          <DeleteLambdaButton {...record} />
        </Space>
      ),
    },
  ]

  return isLoading ? (
    <></>
  ) : (
    <Table
      dataSource={mapDataSource(data?.getLambdas as Array<LambdaRecord>)}
      columns={columns}
    />
  )
}
