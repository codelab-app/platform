import { Button } from 'antd'
import { useResetDataMutation } from '../admin.endpoints'

export const ResetDataButton = () => {
  const [resetData] = useResetDataMutation()

  return <Button onClick={() => resetData()}>Reset Data</Button>
}
