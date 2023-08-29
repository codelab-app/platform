import { useStore } from '@codelab/frontend/presentation/container'
import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ResetDataButton = observer(() => {
  const { adminService } = useStore()
  const resetData = () => adminService.resetData()

  const { actions, onError, onSuccess, state } = useNotify({
    asyncFn: resetData,
    errorNotificationOptions: { title: 'Failed to reset Data' },
    successNotificationOptions: { title: 'Data has been reset successfully' },
  })

  return (
    <Button
      disabled={state.status === 'loading'}
      onClick={() => actions.execute().then(onSuccess).catch(onError)}
    >
      Reset Data
    </Button>
  )
})
