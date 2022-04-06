import { LambdaFragment } from '../../graphql/lambda.fragment.graphql.gen'
import { ActionColumn } from './colums/ActionColumn'

export const useLambdaTable = () => {
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
      render: (_: string, lambda: LambdaFragment) => (
        <ActionColumn lambda={lambda} />
      ),
    },
  ]

  return { columns }
}
