import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef, WithStoreService } from '../../../store'

export type UpdateStoreButtonProps = UpdateButtonProps & WithStoreService

export const UpdateStoreButton = observer(
  ({ id, disabled, storeService }: UpdateStoreButtonProps) => (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => storeService.updateModal.open(storeRef(id))}
      size="small"
      type="primary"
    />
  ),
)
