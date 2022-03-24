import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef, StoreService } from '../../../store'

export interface DeleteStoreButton extends DeleteButtonProps {
  storeStore: StoreService
}

export const DeleteStoreButton = observer(
  ({ disabled, ids, storeStore }: DeleteStoreButton) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => storeStore.deleteModal.open(storeRef(ids[0]))}
        size="small"
      />
    )
  },
)
