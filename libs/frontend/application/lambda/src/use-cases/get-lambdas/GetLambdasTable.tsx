import { Table } from 'antd'
import { useLambdaTable } from './useLambdasTable.hook'

export const GetLambdasTable = () => {
  const { columns } = useLambdaTable()

  return (
    <Table columns={columns} dataSource={[]} rowKey={(lambda) => lambda.id} />
  )
}
