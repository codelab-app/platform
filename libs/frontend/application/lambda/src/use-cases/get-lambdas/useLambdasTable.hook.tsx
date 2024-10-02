import type { ILambdaModel } from '@codelab/frontend/abstract/domain'

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
      render: (_: string, lambda: ILambdaModel) => (
        <ActionColumn lambda={lambda} />
      ),
      title: 'Action',
    },
  ]

  return { columns }
}
