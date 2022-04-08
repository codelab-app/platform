import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef, WithAtomService } from '../../store'

export type DeleteAtomButton = DeleteButtonProps & WithAtomService

export const DeleteAtomButton = observer<DeleteAtomButton>(
  ({ disabled, ids, atomService }) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() =>
          atomService.deleteModal.open(ids.map((id) => atomRef(id)))
        }
        size="small"
      />
    )
  },
)
