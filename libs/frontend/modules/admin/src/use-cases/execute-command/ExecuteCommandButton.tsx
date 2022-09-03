import { IAdminService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ExecuteCommandButton = observer<{ adminService: IAdminService }>(
  ({ adminService }) => {
    const onClick = () => adminService.executeCommandModal.open()

    return <Button onClick={onClick}>Execute Command</Button>
  },
)
