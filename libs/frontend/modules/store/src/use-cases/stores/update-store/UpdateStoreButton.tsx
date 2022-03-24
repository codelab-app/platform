import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef, StoreService } from '../../../store'

export interface UpdateStoreButtonProps extends UpdateButtonProps {
  storeService: StoreService
}

export const UpdateStoreButton = observer(
  ({ id, disabled, storeService }: UpdateStoreButtonProps) => {
    const onClick = () => {
      if (!id) {
        throw new Error('Store ID is not valid')
      }

      storeService.updateModal.open(storeRef(id))
    }

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={onClick}
        size="small"
        type="primary"
      />
    )
  },
)
