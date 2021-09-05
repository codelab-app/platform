import { Button } from 'antd'
import { useResetDataMutation } from './ResetData.api.graphql.gen'

export const ResetDataButton = () => {
  const [resetData] = useResetDataMutation()

  return <Button onClick={() => resetData()}>Reset Data</Button>
}
