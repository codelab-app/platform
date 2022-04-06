import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table } from 'antd'
import React from 'react'
import { useLambdaTable } from './useLambdasTable'

export const GetLambdasTable = () => {
  const { columns } = useLambdaTable()

  return (
    <Table columns={columns} dataSource={[]} rowKey={(lambda) => lambda.id} />
  )
}
