import { Space, Table } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { DeleteLambdaButton } from '../deleteLambda/DeleteLambdaButton'
import { ExecuteLambdaButton } from '../executeLambda/ExecuteLambdaButton'
import { UpdateLambdaButton } from '../updateLambda/UpdateLambdaButton'
import { LambdaRecord } from './LambdaRecord'
import { LambdaFragmentsFragment } from '@codelab/generated'

const mapDataSource = (lambdas: Array<LambdaFragmentsFragment>) => {
  return lambdas.map((lambda) => ({
    id: lambda.id,
    key: lambda.id,
    name: lambda.name,
    body: lambda.body,
  }))
}

export const GetLambdasTable = () => {
  const { app, appId } = useContext(AppContext)

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

  //TODO fix lambdas UI
  return "TODO: get lambdas from library"
  // return <Table dataSource={mapDataSource(rootAppData.lambdas)} columns={columns} />
}
