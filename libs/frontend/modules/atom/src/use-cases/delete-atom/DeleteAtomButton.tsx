import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef, AtomService, WithAtomService } from '../../store'

export type DeleteAtomButton = DeleteButtonProps & WithAtomService

export const DeleteAtomButton = observer<DeleteAtomButton>(
  ({ disabled, ids, atomService }) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() => {
          atomService.setSelectedAtoms(ids.map((id) => atomRef(id)))
          atomService.deleteModal.open()
        }}
        size="small"
      />
    )
  },
)
