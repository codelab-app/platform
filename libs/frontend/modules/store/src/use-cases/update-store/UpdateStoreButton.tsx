import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StateStore, storeRef } from '../../store'

export interface UpdateStoreButtonProps extends UpdateButtonProps {
  stateStore: StateStore
}

export const UpdateStoreButton = observer(
  ({ id, disabled, stateStore }: UpdateStoreButtonProps) => {
    const onClick = () => {
      if (!id) {
        throw new Error('Store ID is not valid')
      }

      stateStore.updateModal.open(storeRef(id))
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
