import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { useResetDataMutation } from '../../store'

export const ResetDataButton = () => {
  const [resetData] = useResetDataMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Data has been reset successfully' },
    { title: 'Failed to reset Data' },
  )

  const onClick = () => resetData().unwrap().then(onSuccess).catch(onError)

  return <Button onClick={onClick}>Reset Data</Button>
}
