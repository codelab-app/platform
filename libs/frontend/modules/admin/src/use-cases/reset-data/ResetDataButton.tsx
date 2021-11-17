import { Button } from 'antd'
import { useResetDataMutation } from '../../store'

export const ResetDataButton = () => {
  const [resetData] = useResetDataMutation()
  const onClick = () => resetData()

  return <Button onClick={onClick}>Reset Data</Button>
}
