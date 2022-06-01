import { EditOutlined } from '@ant-design/icons'
import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { resourceRef } from '../../store'

export type UpdateResourceButtonProps = UpdateButtonProps &
  WithServices<RESOURCE_SERVICE>

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
