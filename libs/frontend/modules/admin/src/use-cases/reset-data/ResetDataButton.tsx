import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { useResetDatabaseMutation } from '../../store'

export const ResetDataButton = () => {
  const [resetDatabase] = useResetDatabaseMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Data has been reset successfully' },
    { title: 'Failed to reset Data' },
  )

  const onClick = () => resetDatabase().unwrap().then(onSuccess).catch(onError)

  return <Button onClick={onClick}>Reset Data</Button>
}
