import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StateStore, storeRef } from '../../store'

export interface DeleteStoreButton extends DeleteButtonProps {
  storeStore: StateStore
}

export const DeleteStoreButton = observer(
  ({ disabled, ids, storeStore }: DeleteStoreButton) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() =>
          storeStore.deleteModal.open(ids.map((id) => storeRef(id)))
        }
        size="small"
      />
    )
  },
)
