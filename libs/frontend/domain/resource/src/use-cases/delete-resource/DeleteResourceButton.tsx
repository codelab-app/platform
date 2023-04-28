import { DeleteOutlined } from '@ant-design/icons'
import type { IResourceService } from '@codelab/frontend/abstract/core'
import { resourceRef } from '@codelab/frontend/abstract/core'
import type { DeleteButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type DeleteResourceButton = DeleteButtonProps & {
  resourceService: IResourceService
}

export const DeleteResourceButton = observer<DeleteResourceButton>(
  ({ disabled, ids, resourceService }) => (
    <Button
      danger
      disabled={disabled}
      icon={<DeleteOutlined />}
      onClick={() =>
        ids[0] && resourceService.deleteModal.open(resourceRef(ids[0]))
      }
      size="small"
    />
  ),
)
