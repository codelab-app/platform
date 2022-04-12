import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { operationRef, WithOperationService } from '../../../store'

type UpdateOperationButtonProps = WithOperationService & UpdateButtonProps

export const UpdateOperationButton = observer<UpdateOperationButtonProps>(
  ({ id, disabled, operationService }) => (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => operationService.updateModal.open(operationRef(id))}
      size="small"
      type="primary"
    />
  ),
)
