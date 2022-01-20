import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table } from 'antd'
import React from 'react'
import { useGetLambdasQuery } from '../../store'
import { useLambdaTable } from './useLambdasTable'

export const GetLambdasTable = () => {
  const { isLoading, data } = useGetLambdasQuery()
  const { columns } = useLambdaTable()

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Table
        columns={columns}
        dataSource={data?.getLambdas}
        rowKey={(lambda) => lambda.id}
      />
    </SpinnerWrapper>
  )
}
