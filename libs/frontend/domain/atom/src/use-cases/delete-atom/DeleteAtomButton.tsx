import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { IAtomService } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef } from '../../store'

export type DeleteAtomButton = DeleteButtonProps & { atomService: IAtomService }

export const DeleteAtomButton = observer<DeleteAtomButton>(
  ({ disabled, ids, atomService }) => {
    return (
      <Button
        danger
        disabled={disabled}
        icon={<DeleteOutlined />}
        onClick={() =>
          atomService.deleteManyModal.open(ids.map((id) => atomRef(id)))
        }
        size="small"
      />
    )
  },
)
