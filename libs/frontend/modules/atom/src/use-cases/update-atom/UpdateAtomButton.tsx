import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef, AtomStore } from '../../store'

export interface UpdateAtomButtonProps extends UpdateButtonProps {
  atomStore: AtomStore
}

export const UpdateAtomButton = observer(
  ({ id, disabled, atomStore }: UpdateAtomButtonProps) => {
    const onClick = () => {
      if (!id) {
        throw new Error('Atom ID is not valid')
      }

      atomStore.updateModal.open(atomRef(id))
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
