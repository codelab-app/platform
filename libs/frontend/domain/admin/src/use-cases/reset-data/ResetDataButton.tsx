import type { IAdminService } from '@codelab/frontend/abstract/core'
import { useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ResetDataButton = observer<{ adminService: IAdminService }>(
  ({ adminService }) => {
    const { onSuccess, onError } = useNotify(
      { title: 'Data has been reset successfully' },
      { title: 'Failed to reset Data' },
    )

    const onClick = () =>
      adminService.resetData().then(onSuccess).catch(onError)

    return <Button onClick={onClick}>Reset Data</Button>
  },
)
