import React from 'react'
import type { LambdaFragment } from '../../graphql/lambda.fragment.graphql.gen'
import { ActionColumn } from './colums/ActionColumn'

export const useLambdaTable = () => {
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'body',
      key: 'body',
      title: 'Body',
    },
    {
      key: 'action',
      render: (_: string, lambda: LambdaFragment) => (
        <ActionColumn lambda={lambda} />
      ),
      title: 'Action',
    },
  ]

  return { columns }
}
