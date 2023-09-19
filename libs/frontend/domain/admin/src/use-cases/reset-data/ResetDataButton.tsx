import { useStore } from '@codelab/frontend/presentation/container'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { useAsync } from '@react-hookz/web'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ResetDataButton = observer(() => {
  const { adminService } = useStore()
  const [{ status }, resetData] = useAsync(adminService.resetData)

  const onError = useErrorNotify({
    description: '',
    title: 'Failed to reset Data',
  })

  const onSuccess = useSuccessNotify({
    description: '',
    title: 'Data has been reset successfully',
  })

  return (
    <Button
      disabled={status === 'loading'}
      onClick={() => resetData.execute().then(onSuccess).catch(onError)}
    >
      Reset Data
    </Button>
  )
})
