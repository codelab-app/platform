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
        dataSource={data?.getLambdas}
        columns={columns}
        rowKey={(lambda) => lambda.id}
      />
    </SpinnerWrapper>
  )
}
