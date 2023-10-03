import { EditOutlined } from '@ant-design/icons'
import type { IResourceService } from '@codelab/frontend/abstract/core'
import { resourceRef } from '@codelab/frontend/abstract/core'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type UpdateResourceButtonProps = UpdateButtonProps & {
  resourceService: IResourceService
}

export const UpdateResourceButton = observer(
  ({ disabled, id, resourceService }: UpdateResourceButtonProps) => (
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
