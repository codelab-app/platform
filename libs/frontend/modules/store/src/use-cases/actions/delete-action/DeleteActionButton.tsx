import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { actionRef, ActionStore } from '../../../store'

export interface DeleteActionButton extends DeleteButtonProps {
  actionStore: ActionStore
}

export const DeleteActionButton = observer(
  ({ disabled, ids, actionStore }: DeleteActionButton) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() =>
          actionStore.deleteModal.open(ids.map((id) => actionRef(id)))
        }
        size="small"
      />
    )
  },
)
