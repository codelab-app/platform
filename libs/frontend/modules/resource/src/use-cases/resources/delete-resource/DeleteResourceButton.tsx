import { DeleteOutlined } from '@ant-design/icons'
import { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { resourceRef, WithResourceService } from '../../../store'

export type DeleteResourceButton = DeleteButtonProps & WithResourceService

export const DeleteResourceButton = observer<DeleteResourceButton>(
  ({ disabled, ids, resourceService }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() => resourceService.deleteModal.open(resourceRef(ids[0]))}
      size="small"
    />
  ),
)
