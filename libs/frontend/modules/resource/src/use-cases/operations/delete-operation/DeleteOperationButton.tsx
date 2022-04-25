import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { operationRef, WithOperationService } from '../../../store'

type DeleteOperationButtonProps = DeleteButtonProps & WithOperationService

export const DeleteOperationButton = observer<DeleteOperationButtonProps>(
  ({ disabled, ids, operationService }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => operationService.deleteModal.open(operationRef(ids[0]))}
      size="small"
    />
  ),
)
