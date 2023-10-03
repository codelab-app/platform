import { DeleteOutlined } from '@ant-design/icons'
import type { IAtomService } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/abstract/core'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type DeleteAtomButton = DeleteButtonProps & { atomService: IAtomService }

export const DeleteAtomButton = observer<DeleteAtomButton>(
  ({ atomService, disabled, ids }) => {
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
