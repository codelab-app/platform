import { AppPageContext } from '@codelab/frontend/shared'
import { useGetLambdasByLibraryIdQuery } from '@codelab/hasura'
import { Space, Table } from 'antd'
import React, { useContext } from 'react'
import { DeleteLambdaButton } from '../deleteLambda'
import { ExecuteLambdaButton } from '../executeLambda'
import { UpdateLambdaButton } from '../updateLambda/UpdateLambdaButton'
import { LambdaRecord } from './LambdaRecord'

const mapDataSource = (lambdas: Array<LambdaRecord>) => {
  return lambdas?.map((lambda: LambdaRecord) => ({
    id: lambda.id,
    key: lambda.id,
    name: lambda.name,
    body: lambda.body,
  }))
}

export const GetLambdasTable = () => {
  const { app, appId } = useContext(AppPageContext)

  const { loading, data } = useGetLambdasByLibraryIdQuery({
    variables: {
      libraryId: 'f70c9584-4b68-4999-a42e-1755d539b714',
    },
  })

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

  return loading ? (
    <></>
  ) : (
    <Table
      dataSource={mapDataSource(data?.lambda as Array<LambdaRecord>)}
      columns={columns}
    />
  )
}
