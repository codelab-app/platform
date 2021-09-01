import { useResetDataMutation } from '@codelab/shared/codegen/graphql'
import { Button } from 'antd'

export const ResetDataButton = () => {
  const [resetData] = useResetDataMutation()

  return <Button onClick={() => resetData()}>Reset Data</Button>
}
