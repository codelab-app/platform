import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef, AtomStore } from '../../store'

export interface DeleteAtomButton extends DeleteButtonProps {
  atomStore: AtomStore
}

export const DeleteAtomButton = observer(
  ({ disabled, ids, atomStore }: DeleteAtomButton) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => atomStore.deleteModal.open(ids.map((id) => atomRef(id)))}
        size="small"
      />
    )
  },
)
