import { Button } from 'antd'
import { useResetDataMutation } from './ResetData.api.graphql'

export const ResetDataButton = () => {
  const [resetData] = useResetDataMutation()

  return <Button onClick={() => resetData()}>Reset Data</Button>
}
