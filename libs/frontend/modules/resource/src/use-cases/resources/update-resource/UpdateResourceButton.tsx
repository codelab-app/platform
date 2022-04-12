import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { resourceRef, WithResourceService } from '../../../store'

export type UpdateResourceButtonProps = UpdateButtonProps & WithResourceService

export const UpdateResourceButton = observer(
  ({ id, disabled, resourceService }: UpdateResourceButtonProps) => (
    <Button
      disabled={disabled}
      ghost
      icon={<EditOutlined />}
      onClick={() => resourceService.updateModal.open(resourceRef(id))}
      size="small"
      type="primary"
    />
  ),
)
