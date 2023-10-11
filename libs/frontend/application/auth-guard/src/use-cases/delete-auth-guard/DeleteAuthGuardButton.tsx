import { DeleteOutlined } from '@ant-design/icons'
import type { IAuthGuardService } from '@codelab/frontend/abstract/domain'
import { authGuardRef } from '@codelab/frontend/abstract/domain'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type DeleteAuthGuardButton = DeleteButtonProps & {
  authGuardService: IAuthGuardService
}

export const DeleteAuthGuardButton = observer<DeleteAuthGuardButton>(
  ({ authGuardService, disabled, ids }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() =>
        ids[0] && authGuardService.deleteModal.open(authGuardRef(ids[0]))
      }
      size="small"
    />
  ),
)
